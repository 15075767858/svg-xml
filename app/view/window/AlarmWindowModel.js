Ext.define('svgxml.view.window.AlarmWindowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.window-alarmwindow',
    data: {
        "high_limit": 100,
        "low_limit": 0,
        "delay_time": 10,
        "deadband": 0,
        "notification_class": 1,
        "limit": 11,
        "event_enable": 110
    },
    formulas: {
        ck1: {

            get: function (get) {
                var limit = get('limit')
                if (parseInt(limit) >= 10)
                    return true;
                return false;
            },
            set: function (value) {
                var num = this.get('limit')
                value ? num += 10 : num -= 10
                this.set('limit', num)
                console.log(this)
            }
        },
        ck2: {
            get: function (get) {
                var limit = get('limit')
                if (parseInt(limit) == 1 || parseInt(limit) == 11)
                    return true;
                return false;
            },
            set: function (value) {
                var num = this.get('limit')
                value ? num += 1 : num -= 1

                this.set('limit', num)
                console.log(this)
            }

        },
        ck3: {

            get: function (get) {
                var event = get('event_enable')
                if (parseInt(event) >= 100)
                    return true;
                return false;
            },
            set: function (value) {
                var num = this.get('event_enable')
                value ? num += 100 : num -= 100
                this.set('event_enable', num)
            }
        },
        ck4: {
            get: function (get) {
                var event = get('event_enable')
                if (parseInt(event) == 110 ||parseInt(event) == 10||parseInt(event) == 111)
                    return true;
                return false;
            },
            set: function (value) {
                var num = this.get('event_enable')
                value ? num += 10 : num -= 10
                this.set('event_enable', num)
            }
        },
        ck5: {
            get: function (get) {
                var event = get('event_enable')
                if (parseInt(event) == 1 ||parseInt(event) == 11||parseInt(event) == 111)
                    return true;
                return false;
            },
            set: function (value) {
                var num = this.get('event_enable')
                value ? num += 1 : num -= 1
                this.set('event_enable', num)
            }
        }


    }


});
