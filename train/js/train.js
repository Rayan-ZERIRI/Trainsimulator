 	/************************************************************/
	/**
	 * Université Sorbonne Paris Nord, Programmation Web
	 * Auteurs                       : Étienne André
	 * Création                      : 2023/12/11
	 * Dernière modification         : 2024/04/02
	 */
	/************************************************************/

	'use strict'

	/************************************************************/
	/* Constantes */
	const canva = document.getElementById('simulateur');
	/************************************************************/

	/*------------------------------------------------------------*/
	// Dimensions du plateau
	/*------------------------------------------------------------*/

	// Nombre de cases par défaut du simulateur
	const LARGEUR_PLATEAU	= 30;
	const HAUTEUR_PLATEAU	= 15;

	// Dimensions des cases par défaut en pixels
	const LARGEUR_CASE	= 35;
	const HAUTEUR_CASE	= 40;


	/*------------------------------------------------------------*/
	// Types des cases
	/*------------------------------------------------------------*/
	class Type_de_case{
		static Foret						= new Type_de_case('foret');

		static Eau							= new Type_de_case('eau');

		static Rail_horizontal				= new Type_de_case('rail horizontal');

		static Rail_vertical				= new Type_de_case('rail vertical');

		// NOTE: faisant la jonction de horizontal à vertical en allant vers la droite puis vers le haut (ou de vertical vers horizontal en allant de bas vers gauche)
		static Rail_droite_vers_haut		= new Type_de_case('rail droite vers haut');

		// // NOTE: faisant la jonction de vertical à horizontal en allant vers le haut puis vers la droite (ou de horizontal à vertical en allant de gauche vers le bas)
		static Rail_haut_vers_droite		= new Type_de_case('rail haut vers droite');

		// // NOTE: faisant la jonction de horizontal à vertical en allant vers la droite puis vers le bas (ou de vertical vers horizontal en allant de haut vers gauche)
		static Rail_droite_vers_bas		= new Type_de_case('rail droite vers bas');

		// // NOTE: faisant la jonction de vertical à horizontal en allant vers le bas puis vers la droite (ou de horizontal à vertical en allant de gauche vers le haut)
		static Rail_bas_vers_droite		= new Type_de_case('rail bas vers droite');

		static loco = new Type_de_case('locomotive');

		static loco1 = new Type_de_case('locomotive1');

		static loco3 = new Type_de_case('locomotive3');
		
		static loco5 = new Type_de_case('locomotive5');

		static wagon = new Type_de_case('wagon');

		constructor(nom) {
			this.nom = nom;
		}
	}

	// class Rail extends Type_de_case {
	// 	static Rail_horizontal				= new Rail('rail horizontal',);
	// 	static Rail_vertical					= new Rail('rail vertical');
	// 	static Rail_droite_vers_haut			= new Rail('rail droite vers haut');
	// 	static Rail_haut_vers_droite			= new Rail('rail haut vers droite');
	// 	static Rail_droite_vers_bas			= new Rail('rail droite vers bas');
	// 	static Rail_bas_vers_droite			= new Rail('rail bas vers droite');
	// 	constructor(nom) {
	// 		super(nom);
	// 	}
	// }



	/*------------------------------------------------------------*/
	// Images
	/*------------------------------------------------------------*/
	const IMAGE_EAU = new Image();
	IMAGE_EAU.src = 'images/eau.png';

	const IMAGE_FORET = new Image();
	IMAGE_FORET.src = 'images/foret.png';

	const IMAGE_LOCO = new Image();
	IMAGE_LOCO.src = 'images/locomotive.png';

	const IMAGE_RAIL_HORIZONTAL = new Image();
	IMAGE_RAIL_HORIZONTAL.src = 'images/rail-horizontal.png';

	const IMAGE_RAIL_VERTICAL = new Image();
	IMAGE_RAIL_VERTICAL.src = 'images/rail-vertical.png';

	const IMAGE_RAIL_BAS_VERS_DROITE = new Image();
	IMAGE_RAIL_BAS_VERS_DROITE.src = 'images/rail-bas-vers-droite.png';

	const IMAGE_RAIL_DROITE_VERS_BAS = new Image();
	IMAGE_RAIL_DROITE_VERS_BAS.src = 'images/rail-droite-vers-bas.png';

	const IMAGE_RAIL_DROITE_VERS_HAUT = new Image();
	IMAGE_RAIL_DROITE_VERS_HAUT.src = 'images/rail-droite-vers-haut.png';

	const IMAGE_RAIL_HAUT_VERS_DROITE = new Image();
	IMAGE_RAIL_HAUT_VERS_DROITE.src = 'images/rail-haut-vers-droite.png';

	const IMAGE_WAGON = new Image();
	IMAGE_WAGON.src = 'images/wagon.png';


	/************************************************************/
	// Variables globales
	/************************************************************/
	let dernierBoutonClique = null;
	let type_de_case;
	let clone;
	let plateau;
	let all=new Array();
	let p=0;
	let predX, predY;
	let disabled = false;
	// TODO


	/************************************************************/
	/* Classes */
	/************************************************************/
	class Train {
		constructor(dir,loc,wag1,wag2,wag3,wag4,wag5) {
			this.tab=new Array(7);
			this.tab=[dir,loc,wag1,wag2,wag3,wag4,wag5];
			for(let i=this.tab.length - 1;i>=0;i--){
				if(this.tab[i]==undefined)
				this.tab.pop();
			}
		}
	}

	/*------------------------------------------------------------*/
	// Plateau
	/*------------------------------------------------------------*/

	class Plateau{
	/* Constructeur d'un plateau vierge */
	constructor(){
		this.largeur = LARGEUR_PLATEAU;
		this.hauteur = HAUTEUR_PLATEAU;

		// NOTE: à compléter…

		// État des cases du plateau
		// NOTE: tableau de colonnes, chaque colonne étant elle-même un tableau de cases (beaucoup plus simple à gérer avec la syntaxe case[x][y] pour une coordonnée (x,y))
		this.cases = [];
		for (let x = 0; x < this.largeur; x++) {
			this.cases[x] = [];
			for (let y = 0; y < this.hauteur; y++) {
				this.cases[x][y] = Type_de_case.Foret;
			}
		}
	}

	// NOTE: à compléter…

	}



	/************************************************************/
	// Méthodes
	/************************************************************/

	function image_of_case(type_de_case){
	switch(type_de_case){
		case Type_de_case.Foret					: return IMAGE_FORET;
		case Type_de_case.Eau					: return IMAGE_EAU;
		case Type_de_case.Rail_horizontal		: return IMAGE_RAIL_HORIZONTAL;
		case Type_de_case.Rail_vertical			: return IMAGE_RAIL_VERTICAL;
		case Type_de_case.Rail_droite_vers_haut	: return IMAGE_RAIL_DROITE_VERS_HAUT;
		case Type_de_case.Rail_haut_vers_droite	: return IMAGE_RAIL_HAUT_VERS_DROITE;
		case Type_de_case.Rail_droite_vers_bas	: return IMAGE_RAIL_DROITE_VERS_BAS;
		case Type_de_case.Rail_bas_vers_droite	: return IMAGE_RAIL_BAS_VERS_DROITE;
		case Type_de_case.loco					: return IMAGE_LOCO;
		case Type_de_case.loco1					: return IMAGE_LOCO;
		case Type_de_case.loco3					: return IMAGE_LOCO;
		case Type_de_case.loco5					: return IMAGE_LOCO;
		case Type_de_case.wagon					: return IMAGE_WAGON;
		
	}
	}

	function dessine_case(contexte, plateau, x, y) {
		const la_case = plateau.cases[x][y];
		let image_a_afficher = image_of_case(la_case);

		// Check if the type of case contains "rail" in its name
		if (la_case.nom.includes('rail')) {
			// Change the background color to grey
			contexte.fillStyle = 'grey';
			contexte.fillRect(x * LARGEUR_CASE, y * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
		}

		// Draw the image
		contexte.drawImage(image_a_afficher, x * LARGEUR_CASE, y * HAUTEUR_CASE, LARGEUR_CASE, HAUTEUR_CASE);
		console.log("DESSIN")
	}


	function dessine_plateau(page, plateau){
		// Dessin du plateau avec paysages et rails
		for (let x = 0; x < plateau.largeur; x++) {
			for (let y = 0; y < plateau.hauteur; y++) {
				dessine_case(page, plateau, x, y);
			}
	}

	// NOTE: à compléter…
	}


	/************************************************************/
	// Auditeurs
	/************************************************************/

	// TODO


	/************************************************************/
	// Plateau de jeu initial
	/************************************************************/


	function cree_plateau_initial(plateau){
		// Circuit

		plateau.cases[15][7] = Type_de_case.Rail_horizontal;
		plateau.cases[16][7] = Type_de_case.Rail_horizontal;
		plateau.cases[17][7] = Type_de_case.Rail_horizontal;
		plateau.cases[18][7] = Type_de_case.Rail_horizontal;
		plateau.cases[19][7] = Type_de_case.Rail_droite_vers_haut;
		plateau.cases[19][6] = Type_de_case.Rail_vertical;
		plateau.cases[19][5] = Type_de_case.Rail_droite_vers_bas;
		plateau.cases[12][5] = Type_de_case.Rail_horizontal;
		plateau.cases[13][5] = Type_de_case.Rail_horizontal;
		plateau.cases[14][5] = Type_de_case.Rail_horizontal;
		plateau.cases[15][5] = Type_de_case.Rail_horizontal;
		plateau.cases[16][5] = Type_de_case.Rail_horizontal;
		plateau.cases[17][5] = Type_de_case.Rail_horizontal;
		plateau.cases[18][5] = Type_de_case.Rail_horizontal;
		plateau.cases[11][5] = Type_de_case.Rail_haut_vers_droite;
		plateau.cases[11][6] = Type_de_case.Rail_vertical;
		plateau.cases[11][7] = Type_de_case.Rail_bas_vers_droite;

		// Segment isolé à gauche
		plateau.cases[0][7] = Type_de_case.Rail_horizontal;
		plateau.cases[1][7] = Type_de_case.Rail_horizontal;
		plateau.cases[2][7] = Type_de_case.Rail_horizontal;
		plateau.cases[3][7] = Type_de_case.Rail_horizontal;
		plateau.cases[4][7] = Type_de_case.Rail_horizontal;
		plateau.cases[5][7] = Type_de_case.Eau;
		plateau.cases[6][7] = Type_de_case.Rail_horizontal;
		plateau.cases[7][7] = Type_de_case.Rail_horizontal;

		// Plan d'eau
		for(let x = 22; x <= 27; x++){
			for(let y = 2; y <= 5; y++){
				plateau.cases[x][y] = Type_de_case.Eau;
			}
		}

		// Segment isolé à droite
		plateau.cases[22][8] = Type_de_case.Rail_horizontal;
		plateau.cases[23][8] = Type_de_case.Rail_horizontal;
		plateau.cases[24][8] = Type_de_case.Rail_horizontal;
		plateau.cases[25][8] = Type_de_case.Rail_horizontal;
		plateau.cases[26][8] = Type_de_case.Rail_bas_vers_droite;
		plateau.cases[27][8] = Type_de_case.Rail_horizontal;
		plateau.cases[28][8] = Type_de_case.Rail_horizontal;
		plateau.cases[29][8] = Type_de_case.Rail_horizontal;

		// TCHOU
		plateau.cases[3][10] = Type_de_case.Eau;
		plateau.cases[4][10] = Type_de_case.Eau;
		plateau.cases[4][11] = Type_de_case.Eau;
		plateau.cases[4][12] = Type_de_case.Eau;
		plateau.cases[4][13] = Type_de_case.Eau;
		plateau.cases[4][13] = Type_de_case.Eau;
		plateau.cases[5][10] = Type_de_case.Eau;

		plateau.cases[7][10] = Type_de_case.Eau;
		plateau.cases[7][11] = Type_de_case.Eau;
		plateau.cases[7][12] = Type_de_case.Eau;
		plateau.cases[7][13] = Type_de_case.Eau;
		plateau.cases[8][10] = Type_de_case.Eau;
		plateau.cases[9][10] = Type_de_case.Eau;
		plateau.cases[8][13] = Type_de_case.Eau;
		plateau.cases[9][13] = Type_de_case.Eau;

		plateau.cases[11][10] = Type_de_case.Eau;
		plateau.cases[11][11] = Type_de_case.Eau;
		plateau.cases[11][12] = Type_de_case.Eau;
		plateau.cases[11][13] = Type_de_case.Eau;
		plateau.cases[12][11] = Type_de_case.Eau;
		plateau.cases[13][10] = Type_de_case.Eau;
		plateau.cases[13][11] = Type_de_case.Eau;
		plateau.cases[13][12] = Type_de_case.Eau;
		plateau.cases[13][13] = Type_de_case.Eau;

		plateau.cases[15][10] = Type_de_case.Eau;
		plateau.cases[15][11] = Type_de_case.Eau;
		plateau.cases[15][12] = Type_de_case.Eau;
		plateau.cases[15][13] = Type_de_case.Eau;
		plateau.cases[16][10] = Type_de_case.Eau;
		plateau.cases[16][13] = Type_de_case.Eau;
		plateau.cases[17][10] = Type_de_case.Eau;
		plateau.cases[17][11] = Type_de_case.Eau;
		plateau.cases[17][12] = Type_de_case.Eau;
		plateau.cases[17][13] = Type_de_case.Eau;

		plateau.cases[19][10] = Type_de_case.Eau;
		plateau.cases[19][11] = Type_de_case.Eau;
		plateau.cases[19][12] = Type_de_case.Eau;
		plateau.cases[19][13] = Type_de_case.Eau;
		plateau.cases[20][13] = Type_de_case.Eau;
		plateau.cases[21][10] = Type_de_case.Eau;
		plateau.cases[21][11] = Type_de_case.Eau;
		plateau.cases[21][12] = Type_de_case.Eau;
		plateau.cases[21][13] = Type_de_case.Eau;
		plateau.cases[12][7] = Type_de_case.loco;  // Locomotive at this position
		plateau.cases[13][7] = Type_de_case.wagon;  // Wagon following the locomotive
		plateau.cases[14][7] = Type_de_case.wagon;
		plateau.cases[12][7] = Type_de_case.Rail_horizontal;
		plateau.cases[13][7] = Type_de_case.Rail_horizontal;
		plateau.cases[14][7] = Type_de_case.Rail_horizontal;
	}
	//CLONE FUNCTIONS C POUR STOCK LES TRAINS
	function clonePlateau(plateau) {
		const clone = new Plateau(); // Create a new Plateau object

		// Copy the dimensions of the plateau
		clone.largeur = plateau.largeur;
		clone.hauteur = plateau.hauteur;

		// Copy the state of each case on the plateau
		for (let x = 0; x < plateau.largeur; x++) {
			for (let y = 0; y < plateau.hauteur; y++) {
				clone.cases[x][y] = plateau.cases[x][y];
			}
		}

		return clone;
	}

	function updateClone(plateau, x, y, type_de_case) {
		// Check if the provided coordinates are within the bounds of the plateau
		if (x >= 0 && x < plateau.largeur && y >= 0 && y < plateau.hauteur) {
			// Update the clone with the last clicked button type at the specified coordinates
			clone.cases[x][y] = type_de_case;
		} else {
			// Handle the case if the coordinates are out of bounds
			console.error("Coordinates are out of bounds.");
		}
	}

	function getCaseFromClone(clone, x, y) {
		if (x >= 0 && x < clone.largeur && y >= 0 && y < clone.hauteur) {
			const caseFromClone = clone.cases[x][y];
			if (caseFromClone instanceof Type_de_case) {
				return caseFromClone;
			} else {
				console.error("Invalid case type in clone at coordinates (" + x + ", " + y + ")");
				return null;
			}
		} else {
			console.error("Coordinates are out of bounds.");
			return null;
		}
	}
	


	/************************************************************/
	// Fonction principale
	/************************************************************/

	let pause = document.getElementById('bouton_pause');
	let actif = true; 
	function tchou() {
	console.log("Tchou, attention au départ !");
	const contexte = document.getElementById('simulateur').getContext("2d");
	let plateau = new Plateau();
	cree_plateau_initial(plateau);
	clone=clonePlateau(plateau);
	dessine_plateau(contexte, plateau);
	setUpButtonClickEvents(contexte, plateau);
	avancerTrains(plateau, contexte);
	pause.addEventListener('click', function(){
		actif = !actif;
		if(actif)
			avancerTrains(plateau, contexte);
	});
	canva.addEventListener('click', function(event){
		changer_direction(contexte, plateau, clone, 12, 10);
	})
}


function setUpButtonClickEvents(contexte, plateau) {
    
    document.querySelectorAll('button:not(#bouton_pause)').forEach(button => {
        button.addEventListener('click', function (event) {
            if (disabled) {
                
                type_de_case = null;
                console.log(type_de_case);
                event.target.style.backgroundColor = '';
                disabled = false;
                canva.removeEventListener('click', recuperer_case);
            } else {
                
                type_de_case = handleButtonClick(event);


               
                    event.target.style.backgroundColor = ''; // Réinitialiser la couleur de fond du dernier bouton

                // Activer le bouton actuel
                event.target.style.backgroundColor = 'grey';


                // Attacher l'événement pour récupérer les coordonnées de la case
                canva.addEventListener('click', function (event) {
                    recuperer_case(event, contexte, plateau);
                });
                disabled = true;
            }
        });
    });
}


	function creer_train(contexte, plateau, clone, x, y, type_de_case) {

		if(type_de_case === Type_de_case.loco){
			if(plateau.cases[x][y] != Type_de_case.Rail_horizontal){
				alert("Impossible de créer un train ici");
				return;
			}
			else{
				clone.cases[x][y]=Type_de_case.loco;
				all.push(new Train(0,[x,y]));
				dessine_case(contexte, clone, x, y);
				return;
			}

		}
		if(type_de_case === Type_de_case.loco1 ){
			if(x-1<0 || plateau.cases[x][y] != Type_de_case.Rail_horizontal || plateau.cases[x-1][y] != Type_de_case.Rail_horizontal){
				alert("Impossible de créer un train ici")
				return;
			}
			else{
				clone.cases[x][y]=Type_de_case.loco;
				clone.cases[x-1][y]=Type_de_case.wagon;
				all.push(new Train(0,[x,y],[x-1,y]));
				dessine_case(contexte, clone, x, y);
				dessine_case(contexte, clone, x-1, y);
				return;
			}
		}

		if(type_de_case === Type_de_case.loco3){
			if(x-3<0 || plateau.cases[x][y] != Type_de_case.Rail_horizontal
			|| plateau.cases[x-1][y] != Type_de_case.Rail_horizontal
			|| plateau.cases[x-2][y] != Type_de_case.Rail_horizontal
			|| plateau.cases[x-3][y] != Type_de_case.Rail_horizontal){
				alert("Impossible de créer un train ici");
				return;
			}
			else{
				clone.cases[x][y]=Type_de_case.loco;
				clone.cases[x-1][y]=Type_de_case.wagon;
				clone.cases[x-2][y]=Type_de_case.wagon;
				clone.cases[x-3][y]=Type_de_case.wagon;
				all.push(new Train(0,[x,y],[x-1,y],[x-2,y],[x-3,y]));
				dessine_case(contexte, clone, x, y);
				dessine_case(contexte, clone, x-1, y);
				dessine_case(contexte, clone, x-2, y);
				dessine_case(contexte, clone, x-3, y);
				return;
				}
		}
		if(type_de_case === Type_de_case.loco5){
			if(x-5<0 || plateau.cases[x][y] != Type_de_case.Rail_horizontal
			|| plateau.cases[x-1][y] != Type_de_case.Rail_horizontal
			|| plateau.cases[x-2][y] != Type_de_case.Rail_horizontal
			|| plateau.cases[x-3][y] != Type_de_case.Rail_horizontal
			|| plateau.cases[x-4][y] != Type_de_case.Rail_horizontal
			|| plateau.cases[x-5][y] != Type_de_case.Rail_horizontal){
				alert("Impossible de créer un train ici");
				return;
			}
			else{
				clone.cases[x][y]=Type_de_case.loco;
				clone.cases[x-1][y]=Type_de_case.wagon;
				clone.cases[x-2][y]=Type_de_case.wagon;
				clone.cases[x-3][y]=Type_de_case.wagon;
				clone.cases[x-4][y]=Type_de_case.wagon;
				clone.cases[x-5][y]=Type_de_case.wagon;
				all.push(new Train(0,[x,y],[x-1,y],[x-2,y],[x-3,y],[x-4,y],[x-5,y]));
				dessine_case(contexte, clone, x, y);
				dessine_case(contexte, clone, x-1, y);
				dessine_case(contexte, clone, x-2, y);
				dessine_case(contexte, clone, x-3, y);
				dessine_case(contexte, clone, x-4, y);
				dessine_case(contexte, clone, x-5, y);
				return;
			}
		}

	}

	function recuperer_case(event, contexte, plateau) {
		const x = Math.floor(event.offsetX / LARGEUR_CASE);
		const y = Math.floor(event.offsetY / HAUTEUR_CASE);
		if ((type_de_case.nom.includes('locomotive') )) {
			creer_train(contexte, plateau,clone, x, y, type_de_case);
		}
		// Check if the last clicked button type is not a train
		if ((!type_de_case.nom.includes('locomotive') )) {
			// Update the clone with the last clicked button type at coordinates x and y 
			// Redraw the updated case
			plateau.cases[x][y]=type_de_case;
			console.log(type_de_case.nom + 'booo');
			dessine_plateau(contexte, plateau);
		}

		canva.removeEventListener('click', recuperer_case);
	}
	
	let firstIt = true
	// Fonction pour avancer les trains
	function avancerTrains(plateau, contexte) {
		if(actif === false){
			return;}
		
			all.forEach(element => {
	
				for (let i = 1; i < element.tab.length; i++) {
					
					let train = element;
					let x = train.tab[i][0];
					let y = train.tab[i][1];
					if (firstIt === true){
						predX = x; 
						predY = y; 
					}
					let railActuel = plateau.cases[x][y];
					
					let railprecedent = plateau.cases[predX][predY];
					let deplacementX = 0;
					let deplacementY = 0;
	
				
					// Check if the current case contains a rail    
					if (railActuel.nom.includes('rail')) {
						// Determine the movement based on the type of rail
						switch (railActuel) {
							case Type_de_case.Rail_horizontal:
								if (train.tab[0] == 0)
									deplacementX = 1;
								else
									deplacementX = -1;
								break;
							case Type_de_case.Rail_vertical:
								if (train.tab[0] == 0)
									deplacementY = 1;
								else
									deplacementY = -1;
								break;
							case Type_de_case.Rail_droite_vers_haut:
								if (railprecedent == Type_de_case.Rail_horizontal) {
									deplacementY = -1;
									train.tab[0] = 1;
								} else {
									deplacementX = -1;
									train.tab[0] = 1;
								}
								break;
							case Type_de_case.Rail_haut_vers_droite:
								if (railprecedent == Type_de_case.Rail_horizontal) {
									deplacementY = 1;
									train.tab[0] = 0;
								} else {
									deplacementX = 1;
									train.tab[0] = 0;
								}
								break;
							case Type_de_case.Rail_droite_vers_bas:
								if (railprecedent == Type_de_case.Rail_horizontal) {
									deplacementY = 1;
									train.tab[0] = 0;
								} else {
									deplacementX = -1;
									train.tab[0] = 1;
								}
								break;
							case Type_de_case.Rail_bas_vers_droite:
								if (railprecedent == Type_de_case.Rail_horizontal) {
									deplacementY = -1;
									train.tab[0] = 1;
								} else {
									deplacementX = 1;
									train.tab[0] = 0;
								}
								break;
							default:
								// Handle unexpected case
								break;
						}
					}					
					
					let px = 0;
					px=deplacementX + x;
					let py = 0;
					py=deplacementY + y;
					if(plateau.cases[px][py].nom.includes('rail')){
						if((railActuel === Type_de_case.Rail_horizontal && plateau.cases[px][py].nom.includes('rail bas') && train.tab[0]==0)
						|| (railActuel === Type_de_case.Rail_horizontal && plateau.cases[px][py].nom.includes('rail haut') && train.tab[0]==0) 
						|| (railActuel === Type_de_case.Rail_vertical && (plateau.cases[px][py].nom.includes('rail droite vers haut') || plateau.cases[px][py].nom.includes('rail bas')) && train.tab[0]==1)
						|| (railActuel === Type_de_case.Rail_vertical && (plateau.cases[px][py].nom.includes('rail droite vers bas') || plateau.cases[px][py].nom.includes('rail haut'))  && train.tab[0]==0)  
						|| (clone.cases[px][py]=='locomotive') || (clone.cases[px][py]=='wagon')){
							updateClone(plateau, x, y, plateau.cases[x][y]);
							dessine_case(contexte, clone, x, y);
							train.tab.splice(i, 1);
						}
						else{
							predX= train.tab[i][0]; 
							predY= train.tab[i][1];
							train.tab[i][0] = px;
							train.tab[i][1] = py;
							updateClone(plateau, px, py, clone.cases[x][y]);
							updateClone(plateau, x, y, plateau.cases[x][y]);
							dessine_case(contexte, clone, x, y);
							dessine_case(contexte, clone, px, py);
							console.log(px + " : " + py)
							firstIt = false;
						}
					}
					else{
						updateClone(plateau, x, y, plateau.cases[x][y]);
						dessine_case(contexte, clone, x, y);
						train.tab.splice(i, 1);
					}
				}
			});
	
			// Update the plateau after moving the trains
	
			setTimeout(function () {
				avancerTrains(plateau, contexte);
			},1500);
	
			// Actualiser le plateau après avoir fait avancer les trains
	}
	
	function changer_direction(contexte, plateau, clone, x, y) {
		canva.addEventListener('click', function(event){
			const x = Math.floor(event.offsetX / LARGEUR_CASE);
			const y = Math.floor(event.offsetY / HAUTEUR_CASE);
			if(clone.cases[x][y] === Type_de_case.loco){ 
				p = all.findIndex(train => train.tab[1][0] == x && train.tab[1][1] == y);
				let train = all[p];
				if (train.tab[0] == 0) {
				train.tab[0] = 1;
				} else {
				train.tab[0] = 0;
				}
				updateClone(plateau, x, y, clone.cases[x][y]);
				dessine_case(contexte, clone, x, y);
			}
			else{
				console.log("Impossible de changer la direction ici");
			}
		});	
	}	


	



	const correspondances= {
		bouton_foret: Type_de_case.Foret,
		bouton_eau: Type_de_case.Eau,
		bouton_rail_horizontal: Type_de_case.Rail_horizontal,
		bouton_rail_vertical: Type_de_case.Rail_vertical,
		bouton_rail_droite_vers_haut: Type_de_case.Rail_droite_vers_haut,
		bouton_rail_haut_vers_droite: Type_de_case.Rail_haut_vers_droite,
		bouton_rail_droite_vers_bas: Type_de_case.Rail_droite_vers_bas,
		bouton_rail_bas_vers_droite: Type_de_case.Rail_bas_vers_droite,
		bouton_train_1: Type_de_case.loco,
		bouton_train_2: Type_de_case.loco1,
		bouton_train_4: Type_de_case.loco3,
		bouton_train_6: Type_de_case.loco5,
	};

	// recupère l'id du bouton cliqué et retourne le type de case associé
	function handleButtonClick(event) {
		const buttonId = event.target.id;
		if (buttonId in correspondances) {
			let dernierBoutonClique = correspondances[buttonId]; 
	// Update last clicked button type
			return dernierBoutonClique;
		}
	}

	




	/**********************************************************string**/
	// Programme principal
	/************************************************************/
	// NOTE: rien à modifier ici !
	window.addEventListener("load", () => {
	// Appel à la fonction principale
	tchou();
	});