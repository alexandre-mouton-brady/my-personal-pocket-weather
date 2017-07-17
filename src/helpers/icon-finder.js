export default function iconFinder(code) {
  const codeWeather = parseInt(code, 10);

  switch (codeWeather) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 37:
    case 38:
    case 39:
    case 45:
    case 47:
      return '041-storm-1.svg';
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 40:
      return '019-rain-5.svg';
      break;
    case 16:
    case 41:
    case 42:
    case 43:
    case 46:
      return '014-stars.svg';
      break;
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
    case 44:
      return '048-clouds.svg';
      break;
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
      return '012-sun.svg';
      break;
    default:
      return '017-rainbow.svg';
      break;
  }
}
