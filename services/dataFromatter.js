module.exports = {
  pager: (body, page, limit, numRows) => {
    return {
      data: body,
      page: page,
      total_page: Math.ceil(numRows / limit),
      total_rows: numRows,
      rows_per_page: limit,
    };
  },
  formatList: (list, format) => {
    if (format.length === 0) return [...list];
    return list.map((data) => {
      let obj = {};
      format.forEach((element) => {
        if (data[element]) {
          obj[element] = data[element];
        }
      });
      return obj;
    });
  },
  formatObject: (obj, format) => {
    if(obj && Object.keys(obj).length > 0){
      let data = {};
      format.forEach((element) => {
        if (obj[element]) {
          data[element] = obj[element];
        }
      });
      return data;
    }
    return null;
  },
};
