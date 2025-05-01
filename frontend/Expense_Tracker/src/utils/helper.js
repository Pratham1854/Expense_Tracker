export const validateEmail=(email)=>{
const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;  /*
Explanation of the regex:
^              => Start of the string
[^\s@]+        => One or more characters that are NOT whitespace (\s) or '@'
                 (This represents the "local part" before the @)
@              => The '@' symbol
[^\s@]+        => One or more characters that are NOT whitespace or '@'
                 (This represents the domain name)
\.             => A literal dot (.) — escaped because '.' is a special character in regex
[^\s@]+        => One or more characters for the domain extension (e.g., com, org)
$              => End of the string
*/
return regex.test(email);
}