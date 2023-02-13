import React, { useRef } from 'react';
import { Button } from 'antd';
import { jsPDF } from 'jspdf';
import styles from './index.less';

const A4SIZE = { width: 210, height: 297 }; // 单位mm

function renderImg(pdfFile, pageNumber, canvasContext) {
  pdfFile.getPage(pageNumber).then(function(page) {
    let viewport = page.getViewport(3); // 页面缩放比例
    let newcanvas = canvasContext.canvas;
    //设置canvas真实宽高
    newcanvas.width = viewport.width;
    newcanvas.height = viewport.height;
    //设置canvas在浏览中宽高
    newcanvas.style.minWidth = `${A4SIZE.width}px`;
    newcanvas.style.minHeight = `${A4SIZE.height}px`;
    let renderContext = {
      canvasContext: canvasContext,
      viewport: viewport,
    };
    page.render(renderContext);
  });
  return;
}
function BatchPrint() {
  const imgNumber = useRef(0);
  const container = useRef();
  const input = useRef();

  const handlePrint = async () => {
    // 单位用mm，为了指定a4纸的尺寸
    const recordPdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });
    for (let i = 0; i < imgNumber.current; i++) {
      let canvas = document.getElementById('pageNum' + i);
      const imgUrl = canvas.toDataURL('image/png', 1.0);
      recordPdf.addImage(imgUrl, 'PNG', 1, 1, A4SIZE.width, A4SIZE.height);
      recordPdf.addPage();
    }
    // 删除最后一页留白
    const targetPage = recordPdf.internal.getNumberOfPages();
    recordPdf.deletePage(targetPage);
    const fileBlob = await recordPdf.output('blob', { filename: '测试名字' });
    const url = URL.createObjectURL(fileBlob);
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    iframe.contentWindow.print();
  };

  const handleClear = () => {
    input.current.clear();
    imgNumber.current = 0;
    container.current.innerHtml = '';
  };

  const handleSelectFile = () => {
    input.current.click();
  };

  const handleFileChange = e => {
    for (let j = 0; j < e.target.files.length; j++) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[j]); //将文件读取为 DataURL
      // eslint-disable-next-line no-loop-func
      reader.onload = () => {
        window.pdfjsLib.getDocument(reader.result).promise.then(function(pdf) {
          if (pdf) {
            for (let i = 1; i <= pdf.numPages; i++) {
              let canvas = document.createElement('canvas');
              canvas.className = `canvas ${styles['img-item']}`;
              canvas.id = `pageNum${imgNumber.current++}`;
              container.current.appendChild(canvas);
              let context = canvas.getContext('2d');
              renderImg(pdf, i, context);
            }
          }
        });
      };
    }
  };
  return (
    <>
      <Button onClick={handleSelectFile} style={{ marginRight: '20px' }}>
        上传文件
      </Button>
      <Button onClick={handleClear} style={{ marginRight: '20px' }}>
        清空
      </Button>
      <Button type="primary" onClick={handlePrint}>
        打印
      </Button>
      <div className={styles['img-container']} ref={container}></div>
      <input
        ref={input}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="chooseFile"
        type="file"
        multiple
        // accept="application/pdf"
      />
    </>
  );
}
export default BatchPrint;
