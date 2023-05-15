window.onload = () => {
    function rotate() {
        const heading = document.getElementById("my-heading");
        const text = heading.innerText;
        const letters = text.split("");
        const spans = letters.map((letter) => {
            const span = document.createElement("span");
            span.innerText = letter;
            const randomDuration = Math.floor(Math.random() * 500) + 500; // Generate a random animation duration between 500ms and 1000ms
            const randomDelay = Math.floor(Math.random() * 500); // Generate a random animation delay between 0ms and 500ms
            span.style.animationDuration = `${randomDuration}ms`; // Set the animation duration
            span.style.animationDelay = `${randomDelay}ms`; // Set the animation delay
            const randomRotation = Math.floor(Math.random() * 60) - 30; // Generate random rotation angle between -30 and 30 degrees
            span.style.transform = `rotateZ(${randomRotation}deg)`; // Apply random rotation
            span.style.animationIterationCount = 'infinite'; // Set animation iteration count to infinite
            return span;
        });
        heading.innerHTML = "";
        spans.forEach((span) => heading.appendChild(span));
        setTimeout(rotate,800);
    }
    rotate();
};
