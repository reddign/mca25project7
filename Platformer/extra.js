
    const box = document.querySelector('#box');
    const sprite = document.querySelector('#sprite');
    const button = document.querySelector('button');
    let speed = 5;

    const toNum = (pxVal) => {
        return parseInt(pxVal, 10);
    };

    const handleMovement = (e) => {
        let left = toNum(sprite.style.left);
        const bottom = toNum(sprite.style.bottom);

        switch (e.key) {
            case 'a':
                if (left <= 0) return (sprite.style.left = 0);
                sprite.style.left = left - speed + 'px';
                break;
            case 'd':
                if (left >= 175) return (sprite.style.left = 175);
                sprite.style.left = left + speed + 'px';
                break;
            case 'w':
                if (bottom >= 0) return (sprite.style.bottom = 0);
                sprite.style.bottom = bottom + speed + 'px';
                break;
            case 's':
                if (bottom <= -175) return (sprite.style.bottom = -175);
                sprite.style.bottom = bottom - speed + 'px';
                break;
        }
    };

    window.addEventListener('keydown', handleMovement);

    button.addEventListener('click', () => (speed += 5));
