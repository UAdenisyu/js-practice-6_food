function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    function setZero(num){
        if (num >= 0 && num < 10){
            return '0' + num;
        }
        else{
            return num;
        }
    }
    const d = document;
    //slider 1, 2

    const sliderSlides = d.querySelectorAll(slide),
          sliderMain = d.querySelector(container),
          sliderCounterPrevButton = d.querySelector(prevArrow),
          sliderCounterNextButton = d.querySelector(nextArrow),
          sliderCounterTotalNum = d.querySelector(totalCounter),
          sliderCounterCurrentNum = d.querySelector(currentCounter),
          sliderWrapper = d.querySelector(wrapper),
          sliderField = d.querySelector(field),
          width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 0;
    let offset = 0;
    const totalSlideAmount = sliderSlides.length;

    sliderCounterTotalNum.textContent = `${setZero(totalSlideAmount)}`;
    sliderCounterCurrentNum.textContent = `${setZero(slideIndex+1)}`;

    sliderField.style.width = 100 * sliderSlides.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '1s all';
    sliderWrapper.style.overflow = 'hidden';



    sliderSlides.forEach((slide) => {
        slide.style.width = width;
    });

    sliderMain.style.position = 'relative';

    //добавление автоматического перелистывания слайдера
    let switchInterval,
        autoSlidesSwitching = true;//для отключения автоперелистывания поставить false
    
    function resetAutoSwitch(ms = 8000){
        if (autoSlidesSwitching == true){
            clearInterval(switchInterval);
            switchInterval = setInterval(setSlide, ms, slideIndex+1);
        }
    }

    function setSlide(i){
        if (i < 0){
            slideIndex = sliderSlides.length - 1;
        }
        else {
            if (i >= sliderSlides.length){
                slideIndex = 0;
            }
            else {
                slideIndex = i;
            }
        }
        offset = slideIndex * +width.slice(0, -2);
        sliderCounterTotalNum.textContent = `${setZero(totalSlideAmount)}`;
        sliderCounterCurrentNum.textContent = `${setZero(slideIndex+1)}`;
        sliderField.style.transform = `translateX(-${offset}px)`;
        //устанавливаем активную точку
        sliderIndicators.childNodes.forEach(dot => {
            dot.style.opacity = 0.5;
        });
        sliderIndicators.childNodes[slideIndex].style.opacity = 1;
        //сбиваем таймер автоперелистывания
        resetAutoSwitch();
    }


    sliderCounterNextButton.addEventListener('click', () => {
        setSlide(slideIndex+1);
    });

    sliderCounterPrevButton.addEventListener('click', () => {
        setSlide(slideIndex-1);
    });

    //создаём обертку для точек
    const sliderIndicators = d.createElement('ol');//ordered list
    sliderIndicators.classList.add('slider-indicators');
    sliderIndicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 10px;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    sliderMain.append(sliderIndicators);
    

    //создаём точечки
    for (let i = 0; i < sliderSlides.length; i++) {
        const sliderDot = d.createElement('li');
        sliderDot.setAttribute('data-slide-to', i);
        sliderDot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 30px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: solid transparent;
            border-bottom: solid transparent;
            border-radius: 15px;
            opacity: 0.5;
            transition: opacity .6s ease;
        `;
        sliderIndicators.append(sliderDot);
        if (i == 0){
            sliderDot.style.opacity = 1;
        }
    }

    sliderIndicators.childNodes.forEach(dot => {
        dot.addEventListener('click', () => {
            setSlide(+dot.getAttribute('data-slide-to'));
        });
    });
    resetAutoSwitch();
}

export default slider;