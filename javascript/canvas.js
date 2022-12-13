let ctx = null;
let ctx2 = null;
let ctx3 = null;
let elementClick = null;
let x_before;
let y_before;
let x_before_element;
let y_before_element;
let acoomX; // после захвата мышкой для точного перемещения записи по x
let acoomY;// после захвата мышкой для точного перемещения записи по y
let globalColums = []; // колонка на которую кникнули
let globalCheckedCell = []; 
// let dateData = '2022-04-12';
let spaceLeft = 10; // для свободного место после отрисовки
let spaceRight = 20;  // для свободного место после отрисовки

let yclietsDataRecord = new YclientsApi();

let company_id = [];
let staff_id = [];
let yclientsData = yclietsDataRecord.getRecordsDate();

yclientsData.data.map(function (key){
    if(!company_id.includes(key.company_id)) {
        company_id.push(key.company_id);
    }
    if(!staff_id.includes(key.staff_id)) {
        staff_id.push(key.staff_id);
    }
})
yclientsData.colum_number = staff_id.length
console.log(company_id);
console.log(staff_id);
// yclientsData.data.map(function (key){
//     companies_id[key.company_id].push(key.staff_id);
// })
// console.log(companies_id);


let strokeColor = '(0,0,0,0.5)';

let ShreduleYclientsHours = {
    count: 23,
    width: 20,
    height: 100, // высота ячейки
    top: 10, // отступ
    left: 0,
   
    //rect
    rectColor: 'white',
    // stroke
    strokeColorLineWidth: 0.4,
    strokeColor: strokeColor,
    // text
    textFillStyle : 'black',
    textFont: '16px serif',
    textX: 10,
    textY: 5,
    textAlign: 'center',
    textColor: 'center',
};

ShreduleYclientsHours.header = {
    top: ShreduleYclientsHours.top,
    left: ShreduleYclientsHours.left ,
    width: ShreduleYclientsHours.width,
    height: ShreduleYclientsHours.height * 2,
    right: ShreduleYclientsHours.left + ShreduleYclientsHours.width,
    strokeColorLineWidth: ShreduleYclientsHours.strokeColorLineWidth,
    strokeColor: strokeColor,
}
let ShreduleYclientsMinutes = {
    count: ShreduleYclientsHours.count * 2 + 1,
    width: ShreduleYclientsHours.width,
    height: ShreduleYclientsHours.height / 2,
    top: ShreduleYclientsHours.top,
    left: ShreduleYclientsHours.width,
    color: 'green',
    //rect
    rectColor: 'white',
    // stroke
    strokeColorLineWidth: ShreduleYclientsHours.strokeColorLineWidth,
    strokeColor: ShreduleYclientsHours.strokeColor,
    // text
    textFillStyle : 'black',
    textFont: '12px serif',
    textX: ShreduleYclientsHours.textX * 3,
    textY: ShreduleYclientsHours.textY / 2,
    textAlign: 'center',
    textColor: 'center',
    textText: ['00', '30']
};
ShreduleYclientsMinutes.header = {
    top: ShreduleYclientsHours.top,
    left: ShreduleYclientsMinutes.left,
    width: ShreduleYclientsMinutes.width,
    height: ShreduleYclientsHours.header.height,
    right: ShreduleYclientsMinutes.left + ShreduleYclientsMinutes.width,
    strokeColorLineWidth: ShreduleYclientsHours.strokeColorLineWidth,
    strokeColor: strokeColor,
}
let columShreduleYclients = {
    count: ShreduleYclientsMinutes.count * 2 +1,
    width: 150,
    height: ShreduleYclientsMinutes.height / 2,
    top: ShreduleYclientsMinutes.top,
    left: ShreduleYclientsMinutes.left + ShreduleYclientsHours.width,
    rectColor: 'white',
    columCoordinateXLeft    : 0,
    columCoordinateXRight   : 0,
    columCoordinateYTop     : 0,
    columCoordinateYBottom  : 0,

}
columShreduleYclients.header = {
    top: ShreduleYclientsHours.header.top,
    left: columShreduleYclients.left,
    width: columShreduleYclients.width,
    height: ShreduleYclientsHours.header.height ,
    right: columShreduleYclients.left + columShreduleYclients.width,
    strokeColorLineWidth: ShreduleYclientsHours.strokeColorLineWidth,
    strokeColor: strokeColor,
}
let ShreduleYclientsCells = {
    count: ShreduleYclientsMinutes.count * 2 +1,
    width: 150,
    height: ShreduleYclientsMinutes.height / 2,
    top: ShreduleYclientsMinutes.top,
    left: ShreduleYclientsMinutes.left + ShreduleYclientsHours.width,
    color: 'green',
    //rect
    rectColor: 'white',
    // stroke
    strokeColorLineWidth: ShreduleYclientsMinutes.strokeColorLineWidth,
    strokeColor: ShreduleYclientsMinutes.strokeColor,
    // text
    textFillStyle : 'black',
    textFont: '10px serif',
    textX: ShreduleYclientsMinutes.textX * 3,
    textY: ShreduleYclientsMinutes.textY / 2,
    textAlign: 'center',
    textColor: 'center',

 

    cellLengthToSeconds: 900,// продолжительность ячейки в минутах
    cellLengthToMinutes: 0,

    cellHourStart : 0, // часы
    cellMinuteStart : 0, // минуты

    cellHourEnd : 0, // часы окончание
    cellMinuteEnd : 0, // минуты окончание

    cellTimeToSecondsStart: 0, // начало ячейки
    cellTimeToSecondsEnd : 0, // завершение ячейки

    cellTimeToUnixStart : 0, // завершение ячейки в unix
    cellTimeToUnixEnd : 0, // завершение ячейки в unix
    cellDate: 0,
    cellNumber: 0,
    cellDateStart : 0, // дата мероприятия
    cellDateEnd : 0, // дата мероприятия

    secondsToStartDay : 0,
    secondsToEndDay : 0,
    cellCoordinateX : 0,
    cellCoordinateY : 0,
    cellSeanceLength: 0,

    staffColum : 0,
    // staffId : 0, // отвественный за ячейку
    cellBusy : 0, // свободная ячейка
    cellIsFree : 0, // Свободная ячейка
    cellDayIsFree : 0, // Свободный день

    cellCoordinateXLeft : 0,
    cellCoordinateXRight : 0,
    cellCoordinateYTop : 0,
    cellCoordinateYBottom : 0,
};
var records = [];
let globalClickedRecord = [];

// Сколько колонок отрисовать
function createStaffColumns (array, yclientsData) {
    console.log(yclientsData);
    for (let k = 0; k < staff_id.length; k++) {
        // console.log(staff_id[k]);
        columShreduleYclients.staffId = staff_id[k];
        columShreduleYclients.left = ShreduleYclientsMinutes.left + ShreduleYclientsHours.width + (columShreduleYclients.width * k );
        columShreduleYclients.right = columShreduleYclients.left + columShreduleYclients.width;
        array.push(cloneArray(columShreduleYclients)); 
    }
    console.log(array);
}

function createRecordsObjects (array, yclientsData) { // создаём записи
    // array = [];
    let Date = new DateCalendar();
    for (let k = 0; k < yclientsData.data.length; k++) {
        let record = {};
        record.yclientsRecordSetting = yclientsData.data[k];
        record.customRecordSetting = {}; // настройки
        const unixDate =  Date.getUnixDateByDateAndTime(record.yclientsRecordSetting.date);
        record.customRecordSetting.UnixDate = unixDate;
        record.customRecordSetting.UnixDateTimeStart = +Date.getUnixTimeByDateAndTime(record.yclientsRecordSetting.date);

        record.customRecordSetting.UnixDateTimeEnd = +record.yclientsRecordSetting.seance_length + record.customRecordSetting.UnixDateTimeStart;
        record.customRecordSetting.DateTimeEnd = Date.getObjectDateAndTimeToUnixTime(record.customRecordSetting.UnixDateTimeEnd);
        record.customRecordSetting.DateTimeStart = Date.getObjectDateAndTimeToUnixTime(record.customRecordSetting.UnixDateTimeStart);
        record.customRecordSetting.draw = {
            body :{
                colorBackground : 'rgba(255,0,255,0.5)',
                colorText: '#fff',
                rectColor :'rgba(255,0,255,0.5)',
                textFillStyle :'#fff',
                textFont :'11px serif',
                textAlign :'right',
                textX :  ShreduleYclientsHours.textX,
                textY : ShreduleYclientsHours.textY,

            },
            head : {
                colorBackground : '#1AB394',
                colorText: '#fff',
            },
        },
        record.customRecordSetting.textX =  ShreduleYclientsHours.textX;
        record.customRecordSetting.textY = ShreduleYclientsHours.textY;
        array.push(cloneArray(record));
        record = {};
    }
    console.log(array);
}

function getColumByStaffId (globalColums, staffId) {// найти колонку по ИД сотрудника

    for (let i = 0; i < globalColums.length; i++) {
        if (globalColums[i].staffId == staffId) {
            // console.log('globalColums[i]',globalColums[i]);
            return globalColums[i];
        }
    }
}

function getColumByCoordinatX_Y (left) {// найти колонку по ИД сотрудника
    for (let i = 0; i < globalColums.length; i++) {
        columLeft = globalColums[i].left;
        columRight = globalColums[i].left + globalColums[i].width;
        if (left >= columLeft && columRight > left) {
            // console.log('globalColums[i]',globalColums[i]);
            return globalColums[i];
        }
    }
}




let count = 0;


function elementSetting(element, top, width, height) {
    element.top     = top;
    element.width   = width;
    element.height  = height;
    return element;
}


// 2й столбик

// 1 столбик

function changeCursor(event) { // меняем курсор если он над записью (Ордером)
    let mouse = coordinateMouseByCanvas2(event); // получаем координаты мыши
    changeCell(event);
    for (obj of records) {
        let element = obj.customRecordSetting;
        x_final = element.left + element.width; // правый край элемента по x
        y_final = element.top + element.height; // низ края элемента по y

        if (mouse.x >= element.left && mouse.x < x_final && mouse.y >= element.top && mouse.y < y_final) {
            document.body.style.cursor = 'pointer';
            globalCheckedCell=null;
            break;
        } else {
            document.body.style.cursor = 'default';
        }
    }
}

function changeCell(event) { // меняем ячейку
        globalCheckedCell = clickByRect(event);
        window.requestAnimationFrame(draw3);
}

function drawCell(cell, ctx3) { // отрисовать ячейку после наведения
    // console.log(cell);
    ctx3.fillStyle = '#1AB394'; // заливка бэкграунда
    ctx3.fillRect(cell.cellCoordinateXLeft + spaceLeft, cell.cellCoordinateYTop, cell.cellCoordinateXRight - cell.cellCoordinateXLeft - spaceRight, cell.cellCoordinateYBottom-cell.cellCoordinateYTop); // Квадраты

    ctx3.fillStyle = '#fff'; // цвет текста
    ctx3.font = '12px serif'; // '16px serif',
    ctx3.textAlign= 'center'; // место расположение текста
    ctx3.fillText( `${cell.cellHourStart}:${cell.cellMinuteStart} Новый сеанс`,  cell.cellCoordinateXLeft + (cell.cellCoordinateXRight - cell.cellCoordinateXLeft) / 2, cell.cellCoordinateYTop + (cell.height/1.5) );
}
// Координаты над canvas
function coordinateMouseByCanvas(event) {
    let infoPos = canvas.getBoundingClientRect(); // возвращает размер элемента и его позицию относительно viewport 
    x_click = event.clientX - infoPos.left; // пиксель по x внутри тэга canvas на который нажали
    y_click = event.clientY - infoPos.top; // пиксель по y внутри тэга canvas на который нажали
    return { x: x_click, y: y_click }
}

function coordinateMouseByCanvas2(event) {
    let infoPos = canvas2.getBoundingClientRect(); // возвращает размер элемента и его позицию относительно viewport 
    x_click = event.clientX - infoPos.left; // пиксель по x внутри тэга canvas на который нажали
    y_click = event.clientY - infoPos.top; // пиксель по y внутри тэга canvas на который нажали
    return { x: x_click, y: y_click }
}

function coordinateMouseByCanvas3(event) {
    let infoPos = canvas3.getBoundingClientRect(); // возвращает размер элемента и его позицию относительно viewport 
    x_click = event.clientX - infoPos.left; // пиксель по x внутри тэга canvas на который нажали
    y_click = event.clientY - infoPos.top; // пиксель по y внутри тэга canvas на который нажали
    return { x: x_click, y: y_click }
}

function releaseMouseButton(event) { // отпускаем мышку
    // 5
    if (!globalClickedRecord) {return}
    let columSelectedByDrop = getColumByCoordinatX_Y(globalClickedRecord.left);
    if (!columSelectedByDrop) {  globalClickedRecord = null; return;}
    globalClickedRecord.staffId = columSelectedByDrop.staffId; // сотрудник

    const size = 2;
    let mouse = {};
    mouse.x = globalClickedRecord.left;
    mouse.y = globalClickedRecord.top;
    let list = cloneArray(columSelectedByDrop.shredule); // полное копирование ячеек
    let loopArray = cloneArray(columSelectedByDrop.shredule);
    window.requestAnimationFrame(draw2);
    for (let i = 0; i < list.length; i++) {
        let half = getMiddleIndexFromArray(loopArray, size);
        loopArray = arrayLengthSlice(loopArray, size);
        loopArray = getHalfArrayToX_Y(loopArray, half, mouse);
        if (loopArray.length == 1) {
            // console.log('releaseMouseButton',loopArray);
            let cell = loopArray[0];
            globalClickedRecord.left = cell.cellCoordinateXLeft;
            globalClickedRecord.top = cell.cellCoordinateYTop;
            let seanceLengthSeconds = globalClickedRecord.UnixDateTimeEnd - globalClickedRecord.UnixDateTimeStart;
            globalClickedRecord.UnixDateTimeStart = cell.cellTimeToUnixStart; // старт записи
            globalClickedRecord.UnixDateTimeEnd = cell.cellTimeToUnixStart + seanceLengthSeconds; // старт записи
            let ConverterDate = new DateCalendar;
            globalClickedRecord.DateTimeStart = ConverterDate.getObjectDateAndTimeToUnixTime(globalClickedRecord.UnixDateTimeStart);
            globalClickedRecord.DateTimeEnd = ConverterDate.getObjectDateAndTimeToUnixTime(globalClickedRecord.UnixDateTimeEnd);
        }
    }
    window.requestAnimationFrame(draw2);
    globalClickedRecord = null;
}


function moveRect(event) { // постоянно отрисовываем
    if (!globalClickedRecord ) { return }
    if (!globalClickedRecord.customRecordSetting ) { return }
    if (globalClickedRecord.customRecordSetting.length == 0) {return;}
    let customSettingElement = globalClickedRecord.customRecordSetting;

    let yclientsSettingElement = globalClickedRecord.yclientsRecordSetting;
    
    let mouse = coordinateMouseByCanvas2(event); // получаем координаты мыши
    // console.log('mouse', mouse);
    let x_click = mouse.x;
    let y_click = mouse.y;

    x_before_element;
    y_before_element;

    desplX = x_click - x_before;
    desplY = y_click - y_before;

    acoomX = acoomX + desplX;
    acoomY = acoomY + desplY;

    let cell = getCellByCoordinateX_Y(acoomX, acoomY);
    y_before = y_click;
    x_before = x_click;
    if (cell != undefined) {
    cell = cell[0];
    let overColum = getColumByCoordinatX_Y (x_click);
        let tag = new Tag;
        let ConverterDate = new DateCalendar();
        if ((y_before - y_before_element) > 24) {
    console.log(getCellByCoordinateX_Y(x_before_element, y_before_element));
    // tag.changeCoordinate(`[data-yclients-record-id="${yclientsSettingElement.id}"]`);

        // console.log(cell);
            y_before_element = y_before;
            customSettingElement.top = cell.cellCoordinateYTop;
            console.log('вниз');
            tag.changeYCoordinate(`[data-yclients-record-id="${yclientsSettingElement.id}"]`, customSettingElement.top, 35);
            customSettingElement.DateTimeStart = ConverterDate.getObjectDateAndTimeToUnixTime(cell.cellTimeToUnixStart);
            customSettingElement.DateTimeEnd = ConverterDate.getObjectDateAndTimeToUnixTime( cell.cellTimeToUnixStart + yclientsSettingElement.seance_length);
            // console.log('getColumByCoordinatX_Y',getColumByCoordinatX_Y (customSettingElement.left));
            // console.log(customSettingElement.left);

            window.requestAnimationFrame(draw2);
            

        }
        if ((y_before - y_before_element) < -24) {
          
            // console.log(getCellByCoordinateX_Y(x_before_element, y_before_element));
            console.log();
            // console.log(yclientsSettingElement.seance_length);
            // console.log(getCellByCoordinateX_Y(x_before_element, y_before_element));

            y_before_element = y_before;
            // console.log(cell);
            customSettingElement.top = cell.cellCoordinateYTop;
            tag.changeYCoordinate(`[data-yclients-record-id="${yclientsSettingElement.id}"]`, customSettingElement.top, 35);
            // customSettingElement.left = cell.cellCoordinateXLeft;
            console.log('вверх');

            customSettingElement.DateTimeStart = ConverterDate.getObjectDateAndTimeToUnixTime(cell.cellTimeToUnixStart);
            customSettingElement.DateTimeEnd = ConverterDate.getObjectDateAndTimeToUnixTime( cell.cellTimeToUnixStart + yclientsSettingElement.seance_length);
            // console.log('getColumByCoordinatX_Y',getColumByCoordinatX_Y (customSettingElement.left));
            // console.log(customSettingElement.left);

            window.requestAnimationFrame(draw2);
            
    
        }
        if (overColum.staffId !== yclientsSettingElement.staff_id) {
    console.log(getCellByCoordinateX_Y(x_before_element, y_before_element));

            // console.log(getCellByCoordinateX_Y(x_before_element, y_before_element));

            x_before_element = x_before;

            // console.log('Мы над колонкой', overColum.staffId);
            // customSettingElement.top = cell.cellCoordinateYTop;
            customSettingElement.left = overColum.left;
            tag.changeXCoordinate(`[data-yclients-record-id="${yclientsSettingElement.id}"]`, customSettingElement.left, 18);
            yclientsSettingElement.staff_id = overColum.staffId;
            customSettingElement.DateTimeStart = ConverterDate.getObjectDateAndTimeToUnixTime(cell.cellTimeToUnixStart);
            customSettingElement.DateTimeEnd = ConverterDate.getObjectDateAndTimeToUnixTime( cell.cellTimeToUnixStart + yclientsSettingElement.seance_length);
            window.requestAnimationFrame(draw2);

        }
    }else {
        // console.log(getCellByCoordinateX_Y(elementClick.left, elementClick.top));
    }
   
}

function getCellByCoordinateX_Y(coordinateX, coordinateY){
  
    let coordinate = {
        x : coordinateX = coordinateX< 40 ? coordinateX = 40:coordinateX,
        y : coordinateY,
    }
    const size = 2;
    let colum = getSelectedColumn(coordinate);
    if (colum != undefined) {
        let cellList = cloneArray(colum.shredule); // полное копирование ячеек
        let arrSlice = cloneArray(colum.shredule);
        for (let i = 0; i < cellList.length; i++) {
            let half = getMiddleIndexFromArray(arrSlice, size);
            arrSlice = arrayLengthSlice(arrSlice, size);
            arrSlice = getHalfArrayToX_Y(arrSlice, half, coordinate);
            if (Array.isArray(arrSlice) && 
            arrSlice.length && 
            arrSlice.length == 1) {
                return arrSlice;
            }
        }
    }

    console.log(colum);
}

function clickByRect(event) { // отслеживаем клик по элементу
    elementClick = null;
    const size = 2;
    let mouse = coordinateMouseByCanvas3(event);
    // console.log(mouse);
    let shreduleArray = getSelectedColumn(mouse);
    let list = cloneArray(shreduleArray.shredule); // полное копирование ячеек
    let loopArray = cloneArray(shreduleArray.shredule);
    for (let i = 0; i < list.length; i++) {
        let half = getMiddleIndexFromArray(loopArray, size);
        loopArray = arrayLengthSlice(loopArray, size);
        loopArray = getHalfArrayToX_Y(loopArray, half, mouse);
        if (Array.isArray(loopArray) && 
        loopArray.length && 
        loopArray.length == 1) {
            // console.log(loopArray);
            return loopArray;
        }
    }
}

function clickByOrderOrRecord(event) {
    let mouse = coordinateMouseByCanvas2(event); // получаем координаты мыши
    x_before = mouse.x;
    y_before = mouse.y;
    globalClickedRecord = null;
    for (obj of records) {
        let element = obj.customRecordSetting;
        x_final = element.left + element.width; // правый край элемента по x
        y_final = element.top + element.height; // низ края элемента по y

        if (mouse.x >= element.left && mouse.x < x_final && mouse.y >= element.top && mouse.y < y_final) {
            // if (mouse.x > element.left && mouse.x < x_final && mouse.y > element.top && mouse.y < y_final) {
    console.log('clickByOrderOrRecord', obj);
            globalClickedRecord = obj;
            // console.log(globalClickedRecord);
            x_before_element = mouse.x;
            y_before_element = mouse.y;
            acoomX = element.left;
            acoomY = element.top;
            // console.log(x_before_element);
            // console.log(y_before_element);
            // console.log(globalClickedRecord);
            break;
        } else {
            console.log('на пустую ячейку');
        }
    }
}

function getSelectedColumn (mouse) { // получаем колонку над которой был event
    let x_click = mouse.x;
    for (let i = 0; i < globalColums.length; i++) {
        calendarColumn = globalColums[i];
        let borderRight     = calendarColumn.columCoordinateXRight; // правый край элемента по x
        let borderLeft      = calendarColumn.columCoordinateXLeft; // левый край элемента по x
        if ((borderRight > x_click) && (borderLeft <= x_click)) {
            // console.log('calendarColumn',calendarColumn);
            return calendarColumn;
        }
    }
}

function cloneArray(array) { // клонируем массив
   return JSON.parse(JSON.stringify(array));
}

function getMiddleIndexFromArray(list, size) { // получаем номер индекса по середине
  
    // try {
        if (list != undefined) {
            return Math.ceil(list.length/size);
        }
     
    //   } catch (err) {
    //     console.log('Не сработало');
    //     return 0;
    //   }
}

function arrayLengthSlice (list, size) { // делим массим пополам
    const half = getMiddleIndexFromArray(list, size);
    const listFirst = cloneArray(list); // если не клонировать он удаляет другую часть
    const listSecond = cloneArray(list); // если не клонировать он удаляет другую часть
    let firstHalf = listFirst.splice(0, half)
    let secondHalf = listSecond.splice(-half)
    return [firstHalf, secondHalf];
}

function getHalfArrayToX_Y (arrayPart, half, mouse) { // Отдать часть массив по условию
    let firstHalf = arrayPart[0];
    let secondHalf = arrayPart[1];
    let y_click = mouse.y;

    if (y_click < firstHalf[half-1].cellCoordinateYBottom) {
        console.log(firstHalf);
        console.log(y_click);
        return firstHalf;
    }   

    if (y_click >= secondHalf[0].cellCoordinateYTop) {
        console.log(secondHalf);
        console.log(y_click);
        return secondHalf;
    } 
}

function getPathArrayToUnixTime (arrayPart, record, half) {
    let firstHalf = arrayPart[0];
    let secondHalf = arrayPart[1];
    // // console.log('firstHalf', firstHalf[half-1].cellTimeToUnixEnd);
    // // console.log('record',record.UnixDateTimeStart);
    // // console.log(secondHalf[0]);
    // // console.log(record.UnixDateTimeStart);
    // // console.log(firstHalf);
    // // console.log(record);
    // // console.log(secondHalf);
    if (record.UnixDateTimeStart < firstHalf[half-1].cellTimeToUnixEnd) {
        // // console.log('getPathArrayToUnixTime firstHalf',firstHalf);
        return firstHalf;
    }   

    if (record.UnixDateTimeStart >= secondHalf[0].cellTimeToSecondsStart) {
        // // console.log('getPathArrayToUnixTime secondHalf',secondHalf);
        return secondHalf;
    } 
}


function draw3() {

    // console.log(records);
    canvas3 = document.getElementById('tutorial3');
    let infoPos = canvas3.getBoundingClientRect(); // возвращает размер элемента и его позицию относительно viewport 
    let width = infoPos.width; // получаем ширину элемента
    let height = infoPos.height; // получаем ширину высоту
    ctx3.clearRect(0, 0, width, height); // стираем прошлый кадр
    if (globalCheckedCell) {
        drawCell(globalCheckedCell[0], ctx3);
    }
   
}

function draw2() {

    // console.log(records);
    canvas2 = document.getElementById('tutorial2');
    let infoPos = canvas2.getBoundingClientRect(); // возвращает размер элемента и его позицию относительно viewport 
    let width = infoPos.width; // получаем ширину элемента
    let height = infoPos.height; // получаем ширину высоту
    ctx2.clearRect(0, 0, width, height); // стираем прошлый кадр
    console.log(records);
    const drawCanvas = new DrawCanvas();
    drawCanvas.drawRecordsToCalendarAfterUpdate(records);

}

function draw() {
    canvas = document.getElementById('tutorial1');
    let infoPos = canvas.getBoundingClientRect(); // возвращает размер элемента и его позицию относительно viewport 
    let width = infoPos.width; // получаем ширину элемента
    let height = infoPos.height; // получаем ширину высоту
    ctx.clearRect(0, 0, width, height); // стираем прошлый кадр
    const drawCanvas = new DrawCanvas();
    drawCanvas.drawColumHours(ShreduleYclientsHours);
    drawCanvas.drawColumMinutes(ShreduleYclientsMinutes);
    drawCanvas.drawColumCalendar(globalColums); // отрисовываем колонки
    drawCanvas.drawRecordsToCalendar(records);
}


function initialization() { // точка входа
    // 1
    canvas = document.getElementById('tutorial1'); // Получаем тэг Канвас
    canvas2 = document.getElementById('tutorial2');
    canvas3 = document.getElementById('tutorial3');
    // canvas2.addEventListener('mousedown', clickByRect);
    canvas2.addEventListener('mousedown', clickByOrderOrRecord);
    canvas2.addEventListener('mousemove', changeCursor);
    canvas2.addEventListener('mousemove', moveRect);
    canvas2.addEventListener('mouseup', releaseMouseButton);
    if (canvas.getContext) { // проверка
        ctx = canvas.getContext('2d');
        ctx2 = canvas2.getContext('2d');
        ctx3 = canvas3.getContext('2d');
        createStaffColumns(globalColums, yclientsData) // вноси изменения!
        createRecordsObjects(records, yclientsData);
        draw();
        draw2();
    }
}

initialization();

