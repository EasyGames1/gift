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
            bg = "#000000",
            PI = Math.PI,
            rnd = Math.random,
            cos = Math.cos,
            sin = Math.sin,
            width = canvas.current.width,
            height = canvas.current.height,
            MAX_PARTICLES = 100000,
            NFIELDS = 50,
            PARTICLES_LENGTH = MAX_PARTICLES * NFIELDS,
            MAX_AGE = 1.2,
            GRAVITY = 50,
            DRAG = 1;
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
            emit(width * rnd(), height * rnd());
            const imgdata = ctx.getImageData(0, 0, width, height),
                data = imgdata.data;
            for (let i = 0; i < PARTICLES_LENGTH; i += NFIELDS) {
                if ((particles[i + 4] += td) > MAX_AGE) continue;
                let x = ~~(particles[i] = (particles[i] + (particles[i + 2] *= DRAG) * td)),
                    y = ~~(particles[i + 1] = (particles[i + 1] + (particles[i + 3] = (particles[i + 3] + GRAVITY * td) * DRAG) * td));

                if (checkBounds(x, y)) continue;

                const offset = (x + y * width) * 4;

                data[offset] += rnd() * 255;
                data[offset + 1] += rnd() * 255;
                data[offset + 2] += rnd() * 255;
            };
            iteration++;
            ctx.putImageData(imgdata, 0, 0);
            frame.current = requestAnimationFrame(draw, canvas.current);
        };

        window.addEventListener("resize", reload);
        window.addEventListener('mousemove', getMouseCoords);
        draw();

        return () => {
            cancelAnimationFrame(frame.current);
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