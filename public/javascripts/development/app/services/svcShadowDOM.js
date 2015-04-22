senseiApp.service('svcShadowDOM',['$http','$q','$compile',function($http,$q,$compile){
	var htmlDOM = null,$htmlDOM = null, Shadow = null, shadow = null,root = null,son = null;
	this.getShadowDOM = function(urlDOM,iElm,$scope){
			var q = $q.defer()
				$http.get(urlDOM)
				.then(function(response){
							htmlDOM = $compile(response.data)($scope)[0]
							//console.log(htmlDOM);
				}, function(err){console.log(err.data)})
				.then(function(data){
								var Elemnt = Object.create(HTMLElement.prototype);
								Elemnt.createdCallback = function() {
								    var shadow = this.createShadowRoot();
								    //console.log(shadow);
								    //console.log(this));
								    shadow.appendChild(htmlDOM);
								};
								try{
										var elemnt = document.registerElement(iElm[0].localName, {
										    prototype: Elemnt
										});
								}catch(e){

								}

								var drvElemnt = document.createElement(iElm[0].localName);
								iElm.replaceWith(drvElemnt)
								q.resolve(htmlDOM)
					})

			return q.promise;
	}
}]);