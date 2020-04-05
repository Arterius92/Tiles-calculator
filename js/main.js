(function() {
    let roomLength = document.querySelector('.length'), // Длина стены комнаты
        roomWidth = document.querySelector('.width'), // Ширина
        roomHeight = document.querySelector('.height'), // Высота
        doorWidth = document.querySelector('.door-width'), // Ширина двери
        doorHeight = document.querySelector('.door-height'), // Высота двери
        tile = document.querySelector('.tile'); // Список размеров плитки

    let preview = document.querySelector('.preview'); // Превью заполнения плиткой
    let overallResult; // Общий результат подсчетов

    let resultBtn = document.querySelector('.btn-result'), // Кнопка подсчета результата
        clearBtn = document.querySelector('.btn-clear'), // Кнопка очистки полей
        roomAreaResult = document.querySelector('.room-area span'), // Площадь комнаты без дверного проёма
        tileCountResult = document.querySelector('.tile-count span'); // Количество плитки

    roomAreaResult.innerText = 0;
    tileCountResult.innerText = 0;

    // Делаем проверку всех полей на ввод только цифр и точки
    let inputs = document.querySelectorAll('.field');
    inputs.forEach(item => {
        item.addEventListener('input', function() {
            item.value = item.value.substring(0, 4); // Не более 4 символов в поле
            item.value = item.value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
        });
    });

    // Вешаем событие клик по кнопке "Рассчитать"
    resultBtn.addEventListener('click', function() {
        switch (tile.value) {
            case '20X30':
                tileArea = parseFloat((20 * 30) / 10000); // Площадь плитки
                break;
            case '30X60':
                tileArea = parseFloat((30 * 60) / 10000);
                break;
            case '40X80':
                tileArea = parseFloat((40 * 80) / 10000);
                break;
        }
        // Проверяем все ли поля заполнены
        inputs.forEach(item => {
            // Если заполнены, выполняем расчет
            if (item.value != '') {
                item.classList.remove('empty-field');
                // Рассчитываем площадь дверного проёма
                let doorArea = parseFloat(doorWidth.value) * parseFloat(doorHeight.value);
                // Рассчитываем площадь всей комнаты отнимая дверной проём
                let roomArea = parseFloat((parseFloat(roomLength.value) + parseFloat(roomWidth.value)) * 2) * parseFloat(roomHeight.value) - doorArea;

                // Приводим результат к одной цифре после точки
                roomArea = roomArea.toFixed(1);
                // Заносим результат в поле
                roomAreaResult.innerText = roomArea;

                // Рассчитываем количество плитки с запасом в 5%
                let tileCount = (parseFloat(roomArea) / parseFloat(tileArea)) * 0.05;
                // Общий результат подсчетов 
                overallResult = Math.round(parseFloat(roomArea) / parseFloat(tileArea)) + Math.round(tileCount);
                // Заносим общий результат в поле
                tileCountResult.innerText = overallResult;
            } else {
                // Если хоть одно из полей ввода пустое, добавляем класс и выделяем красным
                item.classList.add('empty-field');
                roomAreaResult.innerText = 0;
                tileCountResult.innerText = 0;
            }
        });
        // Вызываем функцию заполнения плиткой превью
        tilePreview();
    });

    // Вешаем событие клик на кнопку "Очистить"
    clearBtn.addEventListener('click', function() {
        location.reload();
    });

    // Функция заполнения поля превью
    function tilePreview() {
        for(let i = 0; i<overallResult; i++) {
            let block = document.createElement('div'); // Создание блока-плитки
            if (tile.value == '20X30') { // Если выбрана плитка размером "20Х30", добавляем определённый класс
                block.classList.add('block-20X30');
            } else if (tile.value == '30X60') {
                block.classList.add('block-30X60');
            } else if (tile.value == '40X80') {
                block.classList.add('block-40X80');
            }
            preview.append(block);
        };
    };
})(window);
