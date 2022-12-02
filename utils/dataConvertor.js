import moment from 'jalali-moment'
import toPersianNumber from './numberConvertor'

const persianMonths = {
  Farvardin: 'فروردین',
  Ordibehesht: 'اردیبهشت',
  Khordaad: 'خرداد',
  Tir: 'تیر',
  Mordaad: 'مرداد',
  Shahrivar: 'شهریور',
  Mehr: 'مهر',
  Aabaan: 'آبان',
  Aazar: 'آذر',
  Dey: 'دی',
  Bahman: 'بهمن',
  Esfand: 'اسفند',
}

const jalaliDate = (date) => {
  const m = moment(date)
  const [year, month, day] = m.format('jYYYY/jMMMM/jDD').split('/')

  const persianYear = toPersianNumber(year)
  const persianMonth = persianMonths[month]
  const persianDay = toPersianNumber(day)

  return [persianYear, persianMonth, persianDay]
}

export default jalaliDate
