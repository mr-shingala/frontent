export const colorArray = ['#f8f8f2', '#66d9ef', '#f44336', '#ae81ff', '#f92672', '#a6e22e', '#e6db74', '#66d9ef']

export const AccountType = ["Student","Instructor","Admin"]

export const FunctioId = [null,'logOut','deleteAccount','deleteCourse','deleteSection','deleteSubSection','loginCourse','rating']
export const Url = 'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1721922889/logout_jyrwsa.png'
export const DeleteAccountUrl = 'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1723361316/delete_fciwy5.png'
export const DeleteCourse = 'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1723719255/removed_cqkoqo.png'
export const loginCourse = 'https://res.cloudinary.com/dlgm6g3gn/image/upload/v1725742168/login_p2m21f.png'
export const RatingIconUrl = "https://res.cloudinary.com/dlgm6g3gn/image/upload/v1727702740/rating_avttaj.png"

export const uppercaseRegex = /[A-Z]/;
export const lowercaseRegex = /[a-z]/;
export const digitRegex = /[0-9]/;
export const specialCharRegex = /[@#$%^&*!]/;
export const commonPasswords = ['123456', 'password', '123456789', '12345678'];

export const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
export const allowedVideoTypes = ['video/mp4'];

const lowercase = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
const uppercase = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export const abcdArray = [...lowercase, ...uppercase];

