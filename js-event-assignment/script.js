document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // 1. Click Event
    const clickBox = document.getElementById('click-box');
    clickBox.addEventListener('click', function() {
        this.classList.toggle('active');
        this.querySelector('p').textContent = this.classList.contains('active') 
            ? 'You clicked me!' 
            : 'Try clicking this box';
    });
    
    // 2. Hover Event
    const hoverBox = document.getElementById('hover-box');
    hoverBox.addEventListener('mouseenter', function() {
        this.classList.add('hovered');
        this.querySelector('p').textContent = 'You hovered over me!';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        this.classList.remove('hovered');
        this.querySelector('p').textContent = 'Move your mouse here';
    });
    
    // 3. Keypress Event
    const keypressBox = document.getElementById('keypress-box');
    const keypressDisplay = document.getElementById('keypress-display');
    
    keypressBox.addEventListener('focus', function() {
        this.classList.add('typing');
        keypressDisplay.textContent = 'Start typing...';
    });
    
    keypressBox.addEventListener('blur', function() {
        this.classList.remove('typing');
        keypressDisplay.textContent = '';
    });
    
    document.addEventListener('keydown', function(e) {
        if (keypressBox.classList.contains('typing')) {
            keypressDisplay.textContent = `You pressed: ${e.key}`;
        }
    });
    
    // 4. Secret Action (Double-click and Long Press)
    const secretBox = document.getElementById('secret-box');
    let pressTimer;
    
    // Double-click
    secretBox.addEventListener('dblclick', function() {
        activateSecret();
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(activateSecret, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function activateSecret() {
        secretBox.classList.add('secret-activated');
        secretBox.querySelector('h3').textContent = 'Secret Activated!';
        secretBox.querySelector('p').textContent = '🎉 Congratulations! You found the secret!';
        
        setTimeout(() => {
            secretBox.classList.remove('secret-activated');
            secretBox.querySelector('h3').textContent = 'Find the Secret!';
            secretBox.querySelector('p').textContent = 'Double-click or long-press me';
        }, 3000);
    }
    
    // ========== Interactive Elements ==========
    
    // 1. Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    const colorDisplay = document.getElementById('color-display');
    
    colorBtn.addEventListener('click', function() {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        colorDisplay.style.backgroundColor = randomColor;
        colorDisplay.textContent = randomColor;
    });
    
    // 2. Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    // Auto-advance gallery every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    }, 5000);
    
    // 3. Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordion items first
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            document.querySelectorAll('.accordion-btn span').forEach(span => {
                span.textContent = '+';
            });
            
            // Open current if it wasn't active
            if (!isActive) {
                content.classList.add('active');
                this.querySelector('span').textContent = '−';
            }
        });
    });
    
    // ========== Form Validation ==========
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            this.reset();
            resetPasswordRules();
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    function validateName() {
        const nameError = document.getElementById('name-error');
        
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('error');
            nameError.textContent = 'Name is required';
            return false;
        } else {
            nameInput.classList.remove('error');
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailInput.classList.add('error');
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('error');
            emailError.textContent = 'Please enter a valid email';
            return false;
        } else {
            emailInput.classList.remove('error');
            emailError.textContent = '';
            return true;
        }
    }
    
    function validatePassword() {
        const passwordError = document.getElementById('password-error');
        const lengthRule = document.getElementById('length-rule');
        const numberRule = document.getElementById('number-rule');
        const specialRule = document.getElementById('special-rule');
        
        let isValid = true;
        
        // Check length
        if (passwordInput.value.length < 8) {
            lengthRule.classList.remove('valid');
            isValid = false;
        } else {
            lengthRule.classList.add('valid');
        }
        
        // Check for number
        if (!/\d/.test(passwordInput.value)) {
            numberRule.classList.remove('valid');
            isValid = false;
        } else {
            numberRule.classList.add('valid');
        }
        
        // Check for special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value)) {
            specialRule.classList.remove('valid');
            isValid = false;
        } else {
            specialRule.classList.add('valid');
        }
        
        if (!isValid) {
            passwordInput.classList.add('error');
            passwordError.textContent = 'Password does not meet requirements';
            return false;
        } else {
            passwordInput.classList.remove('error');
            passwordError.textContent = '';
            return true;
        }
    }
    
    function resetPasswordRules() {
        document.querySelectorAll('.password-rules li').forEach(li => {
            li.classList.remove('valid');
        });
    }
});