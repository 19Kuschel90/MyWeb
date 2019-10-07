///////////////////////////
// Globale Object /////////
///////////////////////////
////////////////////////////////
// Need: 
////////////
// class: Texture-more-button, New-Texture-Ramen,img-Low-Zoom
//        New-Texture
//
this.G_IntiTextureManger = function(World3dObject) {

    var temp = "./images/Texture/backdrop010.jpg";

    //////////////////////////////////////////////////////////////
    // Texture Array
    var textureArray = [
        "./images/Texture/153.JPG",
        "./images/Texture/154.JPG",
        "./images/Texture/155.JPG",
        "./images/Texture/156.JPG",
        "./images/Texture/157.JPG",
        "./images/Texture/158.JPG",
        "./images/Texture/159.JPG",
        "./images/Texture/160.JPG",
        "./images/Texture/161.JPG",
        "./images/Texture/161b.JPG",
        "./images/Texture/162.JPG",
        "./images/Texture/163.JPG",
        "./images/Texture/164.JPG",
        "./images/Texture/165.JPG",
        "./images/Texture/166.JPG",
        "./images/Texture/167.JPG",
        "./images/Texture/168.JPG",
        "./images/Texture/169.JPG",
        "./images/Texture/170.JPG",
        "./images/Texture/171.JPG",
        "./images/Texture/172.JPG",
        "./images/Texture/173.JPG",
        "./images/Texture/175.JPG",
        "./images/Texture/175.JPG",
        "./images/Texture/176.JPG",
        "./images/Texture/177.JPG",
        "./images/Texture/178.JPG",
        "./images/Texture/179.JPG",
        "./images/Texture/180.JPG",
        "./images/Texture/181.JPG",
        "./images/Texture/182.JPG",
        "./images/Texture/183.JPG",
        "./images/Texture/184.JPG",
        "./images/Texture/185.JPG",
        "./images/Texture/186.JPG",
        "./images/Texture/187.JPG",
        "./images/Texture/188.JPG",
        "./images/Texture/189.JPG",
        "./images/Texture/190.JPG",
        "./images/Texture/191.JPG",
        "./images/Texture/192.JPG",
        "./images/Texture/193.JPG",
        "./images/Texture/194.JPG",
        "./images/Texture/195.JPG",
        "./images/Texture/196.JPG",
        "./images/Texture/197.JPG",
        "./images/Texture/198.JPG",
        "./images/Texture/199.JPG",
        "./images/Texture/200.JPG",
        "./images/Texture/Abend_Sommergewitter.jpg",
        "./images/Texture/asphalt_seamless_disp.jpg",
        "./images/Texture/asphalt_seamless.jpg",
        "./images/Texture/Asphalttiles.jpg",
        "./images/Texture/backdrop003.jpg",
        "./images/Texture/backdrop005.jpg",
        "./images/Texture/backdrop007.jpg",
        "./images/Texture/backdrop010.jpg",
        "./images/Texture/backdrop014.jpg",
        "./images/Texture/Betontiles.jpg",
        "./images/Texture/big_concrete_tiles_seamless.jpg",
        "./images/Texture/CheckBoardSepia.jpg",
        "./images/Texture/big_concrete_tiles_seamless.jpg",
        "./images/Texture/CheckBoardSepia.jpg",
        "./images/Texture/CheckerBoardBW.png",
        "./images/Texture/big_concrete_tiles_seamless.jpg",
        "./images/Texture/CheckBoardSepia.jpg",
        "./images/Texture/CheckerBoardSepia2.jpg",
        "./images/Texture/CIMG0212 tiles.jpg",
        "./images/Texture/CrackedMud.jpg",
        "./images/Texture/darkclouds2.jpg",
        "./images/Texture/darkclouds4.jpg",
        "./images/Texture/Dirty_Snow_seamless.jpg",
        "./images/Texture/Dirty_Snow_seamless_disp.jpg",
        "./images/Texture/Field_of_ashes.jpg",
        "./images/Texture/Field_of_ashes_disp.jpg",
        "./images/Texture/flowerpot_soil.jpg",
        "./images/Texture/grnd_of_construction_site.jpg",
        "./images/Texture/Grungelayer_01.png",
        "./images/Texture/Grungelayer_02.png",
        "./images/Texture/Grungelayer_03.png",
        "./images/Texture/Grungelayer_04.png",
        "./images/Texture/Grungelayer_05.png",
        "./images/Texture/Grungelayer_06.png",
        "./images/Texture/Grungelayer_07.png",
        "./images/Texture/Grungelayer_08.png",
        "./images/Texture/Grungelayer_09.png",
        "./images/Texture/Grungelayer_10.png",
        "./images/Texture/Grungelayer_11.png",
        "./images/Texture/Grungelayer_12.png",
        "./images/Texture/Grungelayer_13.png",
        "./images/Texture/Grungelayer_14.png",
        "./images/Texture/Grungelayer_15.png",
        "./images/Texture/Grungelayer_16.png",
        "./images/Texture/Grungelayer_17.png",
        "./images/Texture/Grungelayer_18.png",
        "./images/Texture/Grungelayer_19.png",
        "./images/Texture/Grungelayer_20.png",
        "./images/Texture/Juli-Abend_01.jpg",
        "./images/Texture/Juli-Abend_02.jpg",
        "./images/Texture/Morgenhimmel_02.jpg",
        "./images/Texture/roofing_felt_seamless.jpg",
        "./images/Texture/sandtiles.jpg",
        "./images/Texture/roofing_felt_seamless.jpg",
        "./images/Texture/Strange.jpg",
        "./images/Texture/Unwetter_naht_01.jpg",
        "./images/Texture/Unwetter_naht_02.jpg",
        "./images/Texture/UV_Grid_Lrg.jpg",
        "./images/Texture/wood tiled.jpg",
        "./images/Texture/worn_road_surface.jpg",
        "./images/Texture/worn_road_surface_disp.jpg"


    ]; // End var textureArray
    ///////////////////////////////////////////
    var textureIndex = 0; // textureArray[textureIndex]
    var othis = this;
    ///////////////////////// 
    // Button Texture More
    document.getElementById('Texture-more-buttonID').onclick = function() {
            this.scrollIntoView();
            othis.m_LoadMoreTexture(this);
        }
        ///////////////////////////////////////
        //public:
    this.m_LoadMoreTexture = function(buttonText) {
            if (textureIndex < textureArray.length - 4) {
                // add new Texture to list 
                for (var i = 0; i < 4; i++) {
                    var tempChild = document.createElement("div");
                    tempChild.classList.add("New-Texture-Ramen");
                    // tempChild.style.margin = "3px";
                    var temp = document.createElement("img");
                    tempChild.appendChild(temp);
                    temp.alt = "not found";
                    temp.classList.add("img-Low-Zoom");
                    temp.classList.add("New-Texture");
                    temp.src = textureArray[textureIndex];
                    document.getElementById('Texture-load-more').appendChild(tempChild);
                    textureIndex++;
                }
                this.m_onclickTexture();
            } else {
                // NO more texture in Array (textureArray)
                buttonText.innerHTML = "!!! No more Texture !!!";
            }
        }
        //public:
    this.m_imageTextureLink = function() {
        return temp;
    };

    //public:
    this.m_onclickTexture = function() {

        var allTextureButtonsArray = document.getElementsByClassName("New-Texture"); // img Array
        for (var i = 0; i < allTextureButtonsArray.length; i++) {

            allTextureButtonsArray[i].onclick = function() {
                World3dObject.m_runWorld3D = false;
                temp = this.src;

                World3dObject.m_NewStart();

            }
        }
    }
    this.m_LoadMoreTexture(this);
    this.m_LoadMoreTexture(this);
    this.m_LoadMoreTexture(this);
}