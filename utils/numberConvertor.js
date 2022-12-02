const toPersianNumber = (value) => {
  return value.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d])
}

export default toPersianNumber
