class DrawCanvas {

    drawRecord(element, cartoon) {
        // console.log('Рисуем drawRecord');

        // cartoon.fillStyle = element.draw.body.colorBackground; // заливка бэкграунда
        // cartoon.fillRect(element.left + spaceLeft, element.top, element.width - spaceRight, element.height); // Квадраты
        cartoon.fillStyle = element.draw.head.colorBackground; // заливка бэкграунда
        cartoon.fillRect(element.left + spaceLeft, element.top, element.width - spaceRight, 25); // Квадраты
    }

    drawRecordHeaderText (element, cartoon) {
        // console.log('Рисуем drawRecordText');
        // console.log('element', element);
        let timeStart       = element.DateTimeStart.split(' ')[1].split(':');
        let timeEnd         = element.DateTimeEnd.split(' ')[1].split(':');
        cartoon.fillStyle   = element.draw.body.textFillStyle; // цвет текста
        cartoon.font        = element.draw.body.textFont; // '16px serif',
        cartoon.textAlign   = element.draw.body.textAlign; // место расположение текста
        cartoon.fillText( `${timeStart[0]}:${timeStart[1]} - ${timeEnd[0]}:${timeEnd[1]}`,  element.left + element.width / 2, element.top + (element.textY) * 4);
    }

    // drawRecordBodyText(customElement, yclientsElement,cartoon) {
    //     cartoon.fillStyle   = customElement.draw.body.textFillStyle; // цвет текста
    //     cartoon.font        = customElement.draw.body.textFont; // '16px serif',
    //     cartoon.textAlign   = 'center'; // место расположение текста
    //     let str = '';
    //     for (let service of yclientsElement.services) {
    //         // console.log(service);
    //         // str = str+ service.title + ;
    //         // for (service in element.services) {
    //         //     console.log(service);
    //         //     str = str + service.title; 
    //         // }
           
    //     }
    //     // for(let i = 0; i < yclientsElement.services.lenght; i++) {
          
    //     // }
    //     cartoon.fillText( str ,  customElement.left + customElement.width / 2, customElement.top + (customElement.textY) * 10);

    // }
    drawColumHours (elements) { // ОТРИСОВКА первого столбца
        let element = elements;
        ctx.fillStyle = element.rectColor;
        ctx.fillRect(element.header.left, element.header.top, element.header.width, element.height); // Квадраты
        ctx.strokeStyle =  element.header.strokeColor;
        ctx.lineWidth   = element.header.strokeColorLineWidth;
        ctx.strokeRect(element.header.left, element.header.top, element.header.width, element.header.height); // Квадраты
    
        let top = element.top + element.header.height;
        for (let i = 0; i <= element.count; i++) {
            ctx.fillStyle = element.rectColor;
            ctx.fillRect(element.left, top, element.width, element.height); // Квадраты
    
            ctx.fillStyle = element.textFillStyle;
            ctx.font = element.textFont;
            ctx.textAlign= element.textAlign;
            ctx.fillText(i, element.textX, top + element.textY);
    
            ctx.strokeStyle =  element.strokeColor;
            ctx.lineWidth   = element.strokeColorLineWidth;
            ctx.strokeRect(element.left, top, element.width, element.height) // border
            top = top + element.height;
        }
    }

    drawColumMinutes (elements) { // ОТРИСОВКА второго столбца
        let element = elements;
        ctx.fillStyle = element.rectColor;
        ctx.fillRect(element.header.left, element.header.top, element.header.width, element.height); // Квадраты
        ctx.strokeStyle =  element.header.strokeColor;
        ctx.lineWidth   = element.header.strokeColorLineWidth;
        ctx.strokeRect(element.header.left, element.header.top, element.header.width, element.header.height); // Квадраты
    
        let top = element.top + element.header.height;
        for (let i = 0; i <= element.count; i++) {
            ctx.fillStyle = element.rectColor; // заливка
            ctx.fillRect(element.left, top, element.width, element.height); // Квадраты
    
            if (i % 2 === 0) {
                ctx.fillStyle = element.textFillStyle;
                ctx.font = element.textFont;
                ctx.textAlign= element.textAlign;
                ctx.fillText(element.textText[0], element.textX, top + element.textY);
            }else {
                ctx.fillStyle = element.textFillStyle;
                ctx.font = element.textFont;
                ctx.textAlign= element.textAlign;
                ctx.fillText(element.textText[1], element.textX, top + element.textY);
            }
            ctx.strokeStyle =  element.strokeColor;
            ctx.lineWidth   = element.strokeColorLineWidth;
            ctx.strokeRect(element.left, top, element.width, element.height) // border
            top = top + element.height;
        }
    }

    drawColumCalendar (elements) {
        for(let k = 0; k < elements.length; k++) {
            let element = elements[k];
            ctx.fillStyle = element.rectColor;
            ctx.fillRect(element.left, element.header.top, element.header.width, element.height); // Квадраты
            // console.log(element.header);
    
            ctx.strokeStyle =  element.header.strokeColor;
            ctx.lineWidth   = element.header.strokeColorLineWidth;
            ctx.strokeRect(element.left, element.header.top, element.header.width, element.header.height); // Заголовок столбца
    
            let top = element.top + element.header.height;
            let shredule = [];
            let accumulatorSecondsCell = 0; // складываем по 900 за каждый цикл (ячейка)
            for (let i = 0; i <= element.count; i++) {
                let cell = {};
                let Date = new DateCalendar(); // объект
    
                ctx.fillStyle = element.rectColor; // заливка "белая"
                ctx.fillRect(element.left, top, element.width, element.height); // Квадраты
    
                // if (i % 2 === 0) {
                //     ctx.fillStyle = element.textFillStyle;
                //     ctx.font = element.textFont;
                //     ctx.textAlign= element.textAlign;
                //     // ctx.fillText(element.textText[0], element.textX, top + element.textY);
                // }else {
                //     ctx.fillStyle = element.textFillStyle;
                //     ctx.font = element.textFont;
                //     ctx.textAlign= element.textAlign;
                //     // ctx.fillText(element.textText[1], element.textX, top + element.textY);
                // }
    
                if (i % 2 ===0) {
                    ctx.strokeStyle =  element.strokeColor;
                    ctx.lineWidth   = 1;
              
                    ctx.strokeRect(element.left + spaceLeft, top, element.width - spaceRight, 0) // border
                }else if (i % 2 !== 0) {
                    ctx.strokeStyle =  element.strokeColor;
                    ctx.lineWidth   = 0.3;
              
                    ctx.strokeRect(element.left + spaceLeft, top, element.width - spaceRight, 0) // border
                }
               
                cell.cellLengthToMinutes = ShreduleYclientsCells.cellLengthToSeconds / 60; // сколько в секундах длится 1 ячейка
    
                cell.cellCoordinateXLeft = element.left;
                cell.cellCoordinateXRight = element.left + element.width;
                cell.cellCoordinateYTop = top;
                cell.cellCoordinateYBottom = top + element.height;
                cell.staffId = element.staffId;
                cell.height = element.height;
    
                cell.cellNumber = i; // номер ячейки в колонке
                cell.cellDate = Date.getDateNow();
                cell.cellTimeToSecondsStart = accumulatorSecondsCell;
    
                cell.cellTimeToSecondsEnd = cell.cellTimeToSecondsStart + ShreduleYclientsCells.cellLengthToSeconds;
                cell.cellTimeToUnixStart = +Date.getUnixTimeByDate(Date.getDateNow()) + cell.cellTimeToSecondsStart;
                cell.cellTimeToUnixEnd = cell.cellTimeToUnixStart + ShreduleYclientsCells.cellLengthToSeconds;
    
                cell.cellHourStart = Date.getHoursByObjectDate(cell.cellTimeToUnixStart);
                cell.cellHourEnd = Date.getHoursByObjectDate(cell.cellTimeToUnixEnd);
    
                cell.cellMinuteStart = Date.getMinutesByObjectDate(cell.cellTimeToUnixStart);
                cell.cellMinuteEnd  = Date.getMinutesByObjectDate(cell.cellTimeToUnixEnd);
    
                shredule.push(JSON.parse(JSON.stringify(cell))); 
    
                top = top + element.height;
                accumulatorSecondsCell += ShreduleYclientsCells.cellLengthToSeconds;
    
            }
            element.columCoordinateXLeft    = shredule[0].cellCoordinateXLeft;
            element.columCoordinateXRight   = shredule[0].cellCoordinateXRight;
            element.columCoordinateYTop     = shredule[0].cellCoordinateYTop;
            element.columCoordinateYBottom  = shredule[shredule.length-1].cellCoordinateYBottom;
            element.shredule = shredule;
        }
    }

    // Календарь

    drawColumCalendarAfterUpdate(elements) {
        for(let k = 0; k < elements.length; k++) {
            let element = elements[k];

            let top = element.top;
            for (let i = 0; i <= element.count; i++) {
                ctx.fillStyle = element.rectColor; // заливка "белая"
                ctx.fillRect(element.left, top, element.width, element.height); // Квадраты
                ctx.fillStyle = element.textFillStyle;
                ctx.font = element.textFont;
                ctx.textAlign= element.textAlign;
                ctx.strokeStyle =  element.strokeColor;
                ctx.lineWidth   = element.strokeColorLineWidth;
                ctx.strokeRect(element.left, top, element.width, element.height) // border
                top = top + element.height;
            }
        }
    }

    drawRecordsToCalendar (elements) {
        elements.map (function (elementYclients) {
            
            let yclientsSettingElement = elementYclients.yclientsRecordSetting;
            let customSettingElement = elementYclients.customRecordSetting;
            // console.log(yclientsSettingElement);
            for (let k = 0; k < globalColums.length; k++) {
                if (yclientsSettingElement.staff_id == globalColums[k].staffId) {
                    customSettingElement.left = globalColums[k].left;
                    const size = 2;
                    let colum = getColumByStaffId (globalColums, yclientsSettingElement.staff_id);
                    let list = cloneArray(colum.shredule); // полное копирование ячеек
                    let cellsArray = cloneArray(colum.shredule);
    
                    for (let i = 0; i <list.length; i++) {
                        let half = getMiddleIndexFromArray(cellsArray, size);
                        cellsArray = arrayLengthSlice(cellsArray, size);
                        cellsArray = getPathArrayToUnixTime(cellsArray, customSettingElement, half);
                        if (cellsArray.length == 1) {
                            cellsArray;
                            break;
                        }
                    }
    
                    elementYclients.customRecordSetting.top = cellsArray[0].cellCoordinateYTop;
                    elementYclients.customRecordSetting.width   = columShreduleYclients.width;
                    elementYclients.customRecordSetting.height  = (yclientsSettingElement.seance_length / ShreduleYclientsCells.cellLengthToSeconds) * ShreduleYclientsCells.height;
                    let tag = new Tag;
                    tag.createTagForCanvasCalendar(elementYclients);
                }
            }
        });
    }

    drawRecordsToCalendarAfterUpdate (elements) {
   
        elements.map (function (elementYclients) {
            let yclientsSettingElement = elementYclients.yclientsRecordSetting;
            let customSettingElement = elementYclients.customRecordSetting;
            // console.log(count++);
            for (let k = 0; k < globalColums.length; k++) {
                if (yclientsSettingElement.staff_id == globalColums[k].staffId) {
                    const drawCanvas = new DrawCanvas();
                    drawCanvas.drawRecord(customSettingElement, ctx2);
                    drawCanvas.drawRecordHeaderText(customSettingElement, ctx2);
                    // drawCanvas.drawRecordBodyText(customSettingElement, yclientsSettingElement, ctx2);
                    break;
                }
            }
        });
    }
}