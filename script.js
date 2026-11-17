document.addEventListener("DOMContentLoaded", () => {
  const cvLink = document.querySelector(".mod-btn-cv");
  const cvToast = document.getElementById("cvToast");

  if (cvLink && cvToast) {
    cvLink.addEventListener("click", () => {
      cvToast.textContent = "CV downloading...";
    });
  }
});


// 1. CONTACT FORM - sirf 1 baar
const form = document.querySelector('.contact-form');

form.addEventListener('submit', async function(e){
    e.preventDefault(); // page reload na ho
    
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, message})
        });

        const data = await res.json();
        alert(data.message); // Backend se msg aayega
        
    } catch (error) {
        alert('Thank you! Your message has been sent 💜'); // Agar backend nahi hai to ye chalega
    }
    
    form.reset(); // form khali ho jaye
});

// 2. SKILLS BAR ANIMATION - jab section nazar aaye tab
const skillsBox = document.querySelector('.box-1'); 
const progressBars = document.querySelectorAll('.progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Skills section screen pe aya
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width; // 0% se is % tak jao
            });
            observer.unobserve(skillsBox); // 1 hi bar chale
        }
    });
}, { threshold: 0.2 }); // 20% nazar aaye to start

observer.observe(skillsBox);