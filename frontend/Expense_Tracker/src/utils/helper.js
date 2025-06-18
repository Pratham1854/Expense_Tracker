export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name = '') => {
  if (!name.trim()) return '';
  
  const words = name.trim().split(/\s+/);
  let initials = '';
  
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandSeparator=(num)=>{
    if(num==null || isNaN(num)) return " ";
    const[integerpart,fractionalpart]=num.toString().split(".");
    const formattedinteger=integerpart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return fractionalpart
    ?`${formattedinteger.fractionalpart}`
    :formattedinteger; 
};