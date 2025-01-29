
import countryData from '../../../utils/httpcountry.json'

export const validatePhoneNumber = (dialCode, phoneNumber) => {
    
  const country = Object.values(countryData).find(
    (country) => country.dialCode === dialCode
  );
    if (country) {
    return phoneNumber.length == country.numberLength;
  }
  return false;
};
