// 坐标系和Section互相转换
export function convertCoordinateAndSection(data, type) {
  // Coordinate --> Section
  if (type === 1) {
    return {
      begin: {
        row: {
          start: data.startY,
          end: data.startY + 1,
        },
        col: {
          start: data.startX,
          end: data.startX + 1,
        },
      },
      complete: {
        row: {
          start: data.endY - 1,
          end: data.endY,
        },
        col: {
          start: data.endX - 1,
          end: data.endX,
        },
      },
    };
  } else if (type === 2) {
    // Section --> Coordinate
    return {
      startX: data.begin.col.start,
      startY: data.begin.row.start,
      endX: data.complete.col.end,
      endY: data.complete.row.end,
    };
  }
}

// 从section计算grit-area
export function gridAreaFromSection(section) {
  if (section) {
    return `${section.begin.row.start}/${section.begin.col.start}/${section.complete.row.end}/${section.complete.col.end}`;
  }
}

export function generateGridCells({ columns, rows }) {
  const sections = [];
  for (let i = 1; i <= columns; i++) {
    const col = { start: i, end: i + 1 };
    for (let j = 1; j <= rows; j++) {
      const section = { col, row: { start: j, end: j + 1 } };
      sections.push({ ...section, _id: JSON.stringify(section) });
    }
  }
  return sections;
}

// 根据selection的baseSection和新选中的section计算新的selection
export function computeSelectionBasis(baseSection, newSection) {
  const beginSectionColStart = Math.min(
    newSection.col.start,
    baseSection.col.start
  );
  const beginSectionRowStart = Math.min(
    newSection.row.start,
    baseSection.row.start
  );
  const completeSectionColStart = Math.max(
    newSection.col.end,
    baseSection.col.end
  );
  const completeSectionRowStart = Math.max(
    newSection.row.end,
    baseSection.row.end
  );
  return {
    baseSection,
    begin: {
      col: {
        start: beginSectionColStart,
        end: beginSectionColStart + 1,
      },
      row: {
        start: beginSectionRowStart,
        end: beginSectionRowStart + 1,
      },
    },
    complete: {
      col: {
        start: completeSectionColStart - 1,
        end: completeSectionColStart,
      },
      row: {
        start: completeSectionRowStart - 1,
        end: completeSectionRowStart,
      },
    },
  };
}
