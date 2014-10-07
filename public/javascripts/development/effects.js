			$('.box-left nav').mCustomScrollbar({
					autoHideScrollbar:true,
					scrollInertia:600
					//autoDraggerLength:false
			})
			$('.box-right nav').slimScroll({
				distance:'5px',
				height:'40.1em',
				width:'8em',
				railVisible: true,
    railOpacity: 0.1,
    position:'left'
			})

			$('.listMsjs').slimScroll({
				distance:'5px',
				height:'17em',
				width:'100%',
				railVisible: false,
    railOpacity: 0.1
			})