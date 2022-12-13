class Tag {

     createTagForCanvasCalendar (elementYclients) {
        let div = document.createElement('div');
        console.log(elementYclients)
        elementYclients.yclientsRecordSetting.services.map (function (service){
            div.innerHTML += service.title + " <br>";
        });
        div.innerHTML += elementYclients.yclientsRecordSetting.client?.name + '<br>';
        div.innerHTML += elementYclients.yclientsRecordSetting.client?.phone + '<br>';

        div.dataset.yclientsRecordId = elementYclients.yclientsRecordSetting.id;
        div.className = 'f5--calendar-record';
        
        div.style.position ='absolute';
        div.style['top'] = elementYclients.customRecordSetting.top + 35 + 'px';
        div.style['left'] = elementYclients.customRecordSetting.left + 18 + 'px';
        div.style['z-index'] = 9;
        div.style['height'] = elementYclients.customRecordSetting.height - 25 + 'px';
        div.style['width'] = elementYclients.customRecordSetting.width - 20 + 'px';
        div.style['background-color'] = 'rgba(119,221,119,0.5)';
        document.body.append(div);
    }

    changeYCoordinate (str, YCoordinate, px) {
        let tag = document.querySelector(str);
        tag.style['top'] = YCoordinate + px + 'px';
        return;
    }

    changeXCoordinate(str, XCoordinate, px) {
        let tag = document.querySelector(str);
        tag.style['left'] = XCoordinate + px + 'px';
        return;
    }
}