

(function(){
    angular.module('evenements',[]);
    })();

//Fonction qui récupère les données de la liste
//$http est une injection de service
(function(){    

    angular.module('evenements')
    .controller('eventController',function($scope,$http){
        var _this = this;
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var day = time.getDate();
        this.pageActive = 1;
        this.selectedTab = 1;
        this.uid = 0;
        this.page = 1 ;
        $scope.index = 0;
        $scope.list=[];
        $scope.onglet = 1;
        $scope.listeAfficher = [];
        $scope.listnull = [];



        $http.get('./data/evenements-a-paris.json').then(function(data){
            $scope.list = data.data;
            $scope.index = 0;
             _this.page = $scope.list.length / 20 ;
                _this.page = Math.trunc(_this.page);
                if ($scope.list.length%20 !== 0) { _this.page++;}
            });


        /*Onglet selectionné*/
        this.selectTab = function(id){
            this.selectedTab = id;
        };

        /*Onglet ouvert par défaut (description)*/
        this.OngletParDefaut = function(uid){
            this.uid = uid;
            this.selectedTab = uid+'1';
        };

        /*Mise en forme de la date*/
        if (month<10) { month = "0"+month;}
        var date = year+"-"+month+"-"+day;


        /*Evenements débutant aujourd'hui*/
        this.StartDate=function(){
                $scope.listeAfficher=[];
                for (var i = 0; i <$scope.list.length; i++) {
                    if($scope.list[i].fields.date_start === date){
                        $scope.listeAfficher.push($scope.list[i]);
                    }            }
            
        };

         /*Evenements finnissant aujourd'hui*/
        this.EndDate=function(){
                $scope.listeAfficher=[];
                for (var i = 0; i <$scope.list.length; i++) {
                    if($scope.list[i].fields.date_end === date){
                        $scope.listeAfficher.push($scope.list[i]);
                    }

            }
            
        };

        /*Affichage Page suivante*/
        this.next=function(){
            if(_this.pageActive<_this.page){
                _this.pageActive++;
                $scope.index+=20;
            }
            else{
                alert('Vous êtes déjà à la première page !!');
            }
        };

        /*Affichage Page précédante*/
        this.previous=function(){
            if (_this.pageActive>1) {

                _this.pageActive--;

                $scope.index= $scope.index - 20;
            }
            else{
                alert("Vous êtes déjà à la première page !!");
            }
            
        };   
    });
    
    /*Affichage de 20 elements par page*/
    angular.module('evenements')
    .filter('Pagination', function(){

        return function(list, index, listeAfficher){
            var listAfficher=[];
         
         if(listeAfficher[0]== undefined){
             for(var i = index ; i < index + 20 ; i++){

            listAfficher.push(list[i]);
           
                }

         }else{
            for (var i = 0; i <listeAfficher.length; i++) {
                listAfficher.push(listeAfficher[i]);               
            }
        
                            listeAfficher[0]=== undefined; 
            }
            
                 

            return listAfficher;


        };
        
    });
})();

      
//Fonction qui gère les avis
(function(){
    angular.module('evenements')
    .controller('avisController', function(){

        this.infos={
            name:" ",
            avis:" ",
            stars:"0"

        };

        this.infoList=[];

        this.on_submit=function(){           
            alert('Votre avis a bien été pris en compte :\nNom : '+this.infos.name+'\nAvis : '+this.infos.avis+'\nNote : '+this.infos.stars+'/5');
            this.infos={};
        };
    });

})();


/*Gère la barre de recherche*/
function searchToggle(obj, evt){

    var container = $(obj).closest('.search-wrapper');

        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }

}
