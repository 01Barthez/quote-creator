/**
 * Truncate a string based on word or character limit.
 * 
 * @param text - The input string to truncate.
 * @param limit - The limit (number of words or characters).
 * @param type - The type of limit: 'words' or 'letters'.
 * @returns The truncated string with "..." if it exceeds the limit.
 */
const truncateText = (text: string, limit: number, type: 'words' | 'letters'): string => {
    if (type === 'words') {
      // Split the text into words
      const words = text.split(' ');
      // Check if the number of words exceeds the limit
      if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
      }
      return text; // Return the original text if within limit
    }
  
    if (type === 'letters') {
      // Check if the number of characters exceeds the limit
      if (text.length > limit) {
        return text.slice(0, limit) + '...';
      }
      return text; // Return the original text if within limit
    }
  
    // Default return in case of invalid type
    return text;
  };

  export default truncateText;