function updateCharCount(textarea) {
    const maxLength = 500;
    const currentLength = textarea.value.length;
    const charCountElement = document.getElementById('charCount');
    
    charCountElement.textContent = `${currentLength}/${maxLength}`;

    if (currentLength > maxLength) {
        charCountElement.style.color = 'red';
    } else {
        charCountElement.style.color = '';
    }
}