document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const contactForm = document.querySelector('.contact-form');
    
    // Result Portal elements
    const resultSearchForm = document.getElementById('resultSearchForm');
    const examButtons = document.querySelectorAll('.exam-select-btn');
    const searchInterface = document.getElementById('searchInterface');
    const selectedExamTitle = document.getElementById('selectedExamTitle');
    const selectedExamType = document.getElementById('selectedExamType');

    // --- Hero Section Background Slideshow Logic ---
    const heroSection = document.getElementById('home');
    // NOTE: Gallery images ke naam yahan se liye ja rahe hain. Agar koi photo ka naam badla to yahan badalna hoga.
    const galleryImages = [
        'WhatsApp Image 2025-10-12 at 8.08.32 PM.jpeg',
        'WhatsApp Image 2025-10-12 at 8.08.31 PM.jpeg',
        'WhatsApp Image 2025-10-12 at 8.06.31 PM.jpeg',
        'WhatsApp Image 2025-10-11 at 2.20.18 PM.jpeg',
        'WhatsApp Image 2025-09-07 at 2.32.48 PM.jpeg',
        'WhatsApp Image 2025-09-06 at 9.55.14 AM.jpeg',
        'WhatsApp Image 2025-09-06 at 9.55.13 AM.jpeg',
        'WhatsApp Image 2025-09-13 at 4.37.55 PM.jpeg'
    ];
    let currentImageIndex = 0;

    function changeHeroBackground() {
        heroSection.querySelectorAll('.hero-background-slides').forEach(slide => {
            slide.classList.remove('active');
        });

        const newSlide = document.createElement('div');
        newSlide.classList.add('hero-background-slides');
        newSlide.style.backgroundImage = `url('${galleryImages[currentImageIndex]}')`;
        heroSection.prepend(newSlide);

        setTimeout(() => {
            newSlide.classList.add('active');
        }, 50);

        const oldSlides = heroSection.querySelectorAll('.hero-background-slides');
        if (oldSlides.length > 1) {
            setTimeout(() => {
                oldSlides[oldSlides.length - 1].remove();
            }, 1600); // CSS transition time + buffer
        }
        
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    }

    changeHeroBackground();
    setInterval(changeHeroBackground, 5000); 
    // --- End Hero Section Background Slideshow Logic ---


    // --- General Logic (Nav, Contact Form) ---
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        navMenu.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                if(navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Your message has been sent successfully. The GDJPS team will contact you soon. Thank you!');
            contactForm.reset();
        });
    }

    // --- FINAL UPDATED Result Search Logic ---
    // 1. Exam Button Click Logic
    examButtons.forEach(button => {
        button.addEventListener('click', function() {
            examButtons.forEach(btn => {
                btn.classList.remove('active-exam-btn');
                btn.style.backgroundColor = 'var(--primary-color)';
            });
            this.classList.add('active-exam-btn');
            this.style.backgroundColor = 'var(--text-dark)';

            const examType = this.getAttribute('data-exam');
            const examTitle = this.textContent;

            selectedExamTitle.textContent = examTitle;
            selectedExamType.value = examType;
            searchInterface.style.display = 'block';
        });
    });

    // 2. Search Form Submission Logic
    if (resultSearchForm) {
        resultSearchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const examType = document.getElementById('selectedExamType').value;
            const classFolder = document.getElementById('classSelect').value;
            const sectionFolder = document.getElementById('sectionSelect').value; // Section is included
            const rollNo = document.getElementById('rollNoInput').value.trim();

            if (!examType || !classFolder || !sectionFolder || !rollNo) {
                alert('Kripya Exam, Class, Section, aur Roll Number chunein/daalein.');
                return;
            }

            // Roll Number ko teen digits (001) mein format karein
            const formattedRollNo = rollNo.padStart(3, '0');
            
            // Final File Name sirf Roll Number hai (Example: 005.pdf)
            const fileName = `${formattedRollNo}.pdf`;
            
            // Base URL (Your GitHub Pages Base URL)
            // Note: I cannot hardcode your full URL here, but for testing, it usually works this way
            const baseURL = 'https://ashutoshpaswan829812v-svg.github.io/GDJPSchoolOfficial/'; 
            
            // FINAL URL PATH: .../Results/[Exam]/[Class]/[Section]/[Roll No.].pdf
            const finalMarkSheetURL = `${baseURL}Results/${examType}/${classFolder}/${sectionFolder}/${fileName}`;

            // Final Confirmation and Redirect
            alert(`Searching Marksheet for ${classFolder.replace('_', ' ')}, ${sectionFolder.replace('_', ' ')}, Roll No: ${formattedRollNo} for ${examType}. Opening Marksheet if available.`);
            
            // Naye tab mein marksheet khole
            window.open(finalMarkSheetURL, '_blank');
        });
    }
});
