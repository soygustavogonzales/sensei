			$('.box-left nav').mCustomScrollbar({
					autoHideScrollbar:true,
					scrollInertia:600
					//autoDraggerLength:false
			})
			$('.box-right nav').slimScroll({
				distance:'5px',
				height:'37.4em',
				width:'12em',
				railVisible: true,
    railOpacity: 0.1,
    position:'left'
			})

			$('.listMsjs').slimScroll({
				distance:'5px',
				height:'16.8em',
				width:'100%',
				railVisible: false,
    railOpacity: 0.1
			})