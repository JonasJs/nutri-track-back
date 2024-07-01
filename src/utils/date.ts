interface ITimeUnits {
  s: number
  m: number
  h: number
  d: number
  w: number
}

const TIME_UNITS: ITimeUnits = {
  s: 1000, // seconds to milliseconds
  m: 60 * 1000, // minutes to milliseconds
  h: 60 * 60 * 1000, // hours to milliseconds
  d: 24 * 60 * 60 * 1000, // days to milliseconds
  w: 7 * 24 * 60 * 60 * 1000, // weeks to milliseconds
}
/**
 * Converts a time string to milliseconds.
 * @param {string | number} time - The time to convert (e.g., "5s", "10m", "15h", "2d", "1w", 60).
 * @returns {number} - The equivalent time in milliseconds.
 */
function parseTime(time: string | number): number {
  if (typeof time === 'number') {
    return time * TIME_UNITS.s
  }

  const timePattern = /^(\d+)(s|m|h|d|w)$/

  const match = time.match(timePattern)

  if (!match) {
    throw new Error('Invalid time format.')
  }
  const value = parseInt(match[1], 10)
  const unit = match[2] as keyof ITimeUnits

  return value * TIME_UNITS[unit]
}

export function addTimeToDate(time: string | number): Date {
  const milliseconds = parseTime(time)
  const currentDate = new Date()

  return new Date(currentDate.getTime() + milliseconds)
}
