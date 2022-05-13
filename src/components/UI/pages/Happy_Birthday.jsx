import React, { useEffect, useRef } from 'react';

const Happy_Birthday = (props) => {
    const canvas = useRef();
    const frame = useRef();

    const reload = () => {
        window.location.reload();
    };


    useEffect(() => {
        document.querySelector('html').style.overflow = "hidden";
        setTimeout(() => {
            document.querySelector('html').style.overflow = "hidden";
        }, 310);
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight - 56;
        const ctx = canvas.current.getContext('2d'),
            bg = props.theme === "dark" ? "#000000" : "#ffffff",
            PI = Math.PI,
            rnd = Math.random,
            cos = Math.cos,
            sin = Math.sin,
            width = canvas.current.width,
            height = canvas.current.height,
            MAX_PARTICLES = 100000,
            NFIELDS = 5,
            PARTICLES_LENGTH = MAX_PARTICLES * NFIELDS,
            MAX_AGE = 5,
            GRAVITY = 50,
            DRAG = 0.999;
        let
            iteration = 0,
            particles = new Float32Array(PARTICLES_LENGTH),
            particles_i = 0,
            t0 = new Date() * 1,
            mouseX = null,
            mouseY = null;

        const fuzzy = (range, base) => {
            return (base || 0) + (rnd() - 0.5) * range * 2;
        };

        const checkBounds = (x, y) => {
            return x < 0 || x >= width || y < 0 || y >= height;
        };

        const getMouseCoords = (e) => {
            mouseX = e.pageX - canvas.current.offsetLeft;
            mouseY = e.pageY - canvas.current.offsetTop;
        };

        const emit = (x, y) => {
            for (let i = 0; i < 250; i++) {
                particles_i = (particles_i + NFIELDS) % PARTICLES_LENGTH;
                particles[particles_i] = x;
                particles[particles_i + 1] = y;
                const alpha = fuzzy(PI),
                    radius = rnd() * 100,
                    vx = cos(alpha) * radius,
                    vy = sin(alpha) * radius,
                    age = rnd();
                particles[particles_i + 2] = vx;
                particles[particles_i + 3] = vy;
                particles[particles_i + 4] = age;
            };
        };

        const draw = () => {
            let t1 = new Date() * 1,
                td = (t1 - t0) / 1000;
            t0 = t1;
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, width, height);
            if (iteration % 6 === 0) {
                emit(width * rnd(), height * rnd());
            };
            const imgdata = ctx.getImageData(0, 0, width, height),
                data = imgdata.data;
            for (let i = 0; i < PARTICLES_LENGTH; i += NFIELDS) {
                // check age
                if ((particles[i + 4] += td) > MAX_AGE) continue;
                // ~~ = double bitwise inversion = Math.ceil
                let x = ~~(particles[i] = (particles[i] + (particles[i + 2] *= DRAG) * td)),
                    y = ~~(particles[i + 1] = (particles[i + 1] + (particles[i + 3] = (particles[i + 3] + GRAVITY * td) * DRAG) * td));

                // check bounds
                if (checkBounds(x, y)) continue;

                // calculate offset
                const offset = (x + y * width) * 4;

                // set pixel
                data[offset] += "255";
                data[offset + 1] += "132";
                data[offset + 2] += "132";
            };
            // if (iteration % 500 === 0) {
            //     ctx.fillStyle = bg;
            //     ctx.fillRect(0, 0, width, height);
            // };
            // const particle = () => {
            //     ctx.fillStyle = `hsl(${rnd() * 360}, 50%, 50%)`;
            //     ctx.beginPath();
            //     ctx.arc(width * rnd(), height * rnd(), PI, PI, 3 * PI);
            //     ctx.lineWidth = 1;
            //     ctx.fill();
            //     ctx.closePath();
            // };
            // for (let i = 0; i < 5; i++) {
            //     particle();
            // };
            iteration++;
            ctx.putImageData(imgdata, 0, 0);
            frame.current = requestAnimationFrame(draw, canvas.current);
        };

        window.addEventListener("resize", reload);
        window.addEventListener('mousemove', getMouseCoords);
        draw();

        return () => {
            window.removeEventListener("resize", reload);
            window.removeEventListener('mousemove', getMouseCoords);
            document.querySelector('html').style.overflow = "overflow";
        };
    }, []);

    return (
        <canvas
            ref={canvas}
        />
    );
};

export default Happy_Birthday;