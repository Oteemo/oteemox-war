//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', '$http', function ($scope, Upload, $timeout, $http) {
  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: 'http://52.204.86.169:3300/uploadPdf',
        //url: 'http://localhost:3300/uploadPdf',
        data: {file: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total));
      });
    }
  }
  
  $scope.$watch('search', function() {
	  fetch();
	});
  
  $scope.search = "Sherlock";
  
  function fetch(){
      $http.get("http://52.204.86.169:3300/searchElastic?term=" + $scope.search)
      .then(function(response){ $scope.details = response.data; });

    }
  
}]);
