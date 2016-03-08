(function() {
	var app = angular.module('eStore');
	app.directive('mobileScroll', function($window) {
		return function(scope, elem, attr) {
			var win = angular.element($window);
			scope.$watch(function() {
				return {
					'w' : win.width(),
					'h' : win.height()
				};
			}, function(newVal, oldVal) {
				scope.windowHeight = newVal.h;
				scope.windowWidth = newVal.w;
				scope.newWidth = function() {
					if(scope.windowWidth < 601) {
						scope.scrollWidth = newVal.w * 9;
						scope.scrollOffset = 52 * (9 - 1);
						return {
							'width' : scope.scrollWidth + 'px'
						};
					}
				};
				scope.singleWidth = function() {
					if(scope.windowWidth < 601) {
						return {
							'width' : (newVal.w - 52) + 'px'
						};
					}
				}
				scope.rightButton = function() {
					if(scope.windowWidth < 601) {
						return{
							'margin-left' : (scope.windowWidth - 52 - 41) + 'px'
						}
					}
				}
				scope.right = function() {
					scope.leftRight('right');
				}

				scope.left = function() {
					scope.leftRight('left');
				}

				scope.leftRight = function(direction) {
					if($('.modal-body').attr('style').split(':').length <= 2) {
						$('.modal-body').css({transform: 'translate3d(0, 0, 0)'});
					} else if($('.modal-body').css('transform') == 'none') {
						$('.modal-bodu').css({transform: 'translate3d(0, 0, 0)'});
					}
					//var current = $('.modal-body').css('transform').split(', ');
					var current = $('.modal-body').attr('style').split('translate3d(')[1].split('px, ')[0];
					var current = Number(current);
					var multiplier = 0;
					var rightEdge = -(scope.scrollWidth - scope.windowWidth - scope.scrollOffset);
					if(direction == 'right' && current > rightEdge) {
						multiplier = -1;
					} else if(direction == 'left' && current < 0) {
						multiplier = 1;
					}
					var str = 'translate3d(' + (current + (multiplier * (newVal.w - 52))) + 'px, 0, 0)';
					var btn = 'translate3d(' + -(current + (multiplier * (newVal.w - 52))) + 'px, 0, 0)';
					$('.modal-body').css({transform: str});
					$('.mob-btn').css({transform: btn});
				}

			}, true);
			win.bind('mobileScroll', function() {
				scope.$apply();
			});

		}
	});
})();