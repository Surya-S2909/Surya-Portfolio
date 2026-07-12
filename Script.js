
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal:not(.in)');
  if('IntersectionObserver' in window && !reduceMotion){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // 3D tilt on cards
  if(!reduceMotion){
    const tiltEls = document.querySelectorAll('.tilt-card, #editorTilt, #photoTilt');
    tiltEls.forEach(el => {
      let raf = null;
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        if(raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(900px) rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*8).toFixed(2)}deg) translateZ(4px)`;
        });
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });

    // Parallax floating badges follow mouse slightly
    const stage = document.querySelector('.photo-stage');
    if(stage){
      stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        stage.querySelectorAll('.float-badge').forEach((b, i) => {
          const depth = (i+1) * 6;
          b.style.transform = `translate(${x*depth}px, ${y*depth}px)`;
        });
      });
      stage.addEventListener('mouseleave', () => {
        stage.querySelectorAll('.float-badge').forEach(b => b.style.transform = 'translate(0,0)');
      });
    }
  }
