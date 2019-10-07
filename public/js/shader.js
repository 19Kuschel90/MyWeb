window.addEventListener('load', function() {
    G_InitWebGLShaderJS();
});

/////////////////////////////
// G_InitWebGLShaderJS = Editor + 3D World + Accordeon
// 
// Need: 
//      Texture Manger Class (G_IntiTextureManger)  // TextureManger.js
//      id: shader-surface, mySelect, Set-editor-of-VS, Set-editor-of-FS
//          Set-editor-of-Soure
//      class: accordeon-element, 
//      
// public:  
//      this.m_runWorld3D 
//      this.m_NewStart = function() 
var G_InitWebGLShaderJS = function() {

    ///////////////////////////////////////////////////////////////////////////////
    // Ace Editor
    var editor = ace.edit("editor");
    var indexSelecteEditor = 0; // Show   Vertex Shader, Fragment Shader or Source Code
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //   3D Model 
    //  3D Model array string
    var model3Dfile = [
        '../js/Object/cube.json',
        '../js/Object/Sphere.json',
        '../js/Object/Logo4.json',
        '../js/Object/Icosphere.json',
        '../js/Object/Torus.json',
        '../js/Object/Cone.json',
    ];
    var model3DfileIndex = 0; // z.b.: model3Dfile[model3DfileIndex];
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Editor Button
    // Vertex Shader Onclick Button in Editor
    var vertexShaderOnclickButtonEditor = document.getElementById("Set-editor-of-VS");
    // Fragment Shader Onclick Button in Editor
    var fragmentShaderOnclickButtonEditor = document.getElementById("Set-editor-of-FS");
    // Soure Code Onclick Button in Editor
    var SoureCodeOnclickButtonEditor = document.getElementById("Set-editor-of-Soure");

    ////////////Texture////////////////////////////////////////////////////////////////////////
    // Link to Texture (Image)
    //////////////////////////////////////////////////////
    // 3D World Run ///////////////////////////////////////////
    this.m_runWorld3D = true; // public

    // DrawMode
    var accordeonElementArray = document.getElementsByClassName("accordeon-element");
    var drawModeSelection = document.getElementById('mySelect');
    var drawModeString = drawModeSelection.options[0].value;
    ///////////////////////////////////////////////
    // Set Button Load more Texture
    var textureMangerClass = new G_IntiTextureManger(this);

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    //   Vertex Shader, Fragment Shader, Source Code
    //   Vertex Shader String
    var shaderVertexShaderGLSLstring = "precision mediump float;" + '\n' +

        "attribute vec3 vertPosition;" + '\n' +
        "attribute vec2 vertTexCoord;" + '\n' +
        "attribute vec3 vertNormal;" + '\n' +
        "varying vec2 fragTexCoord;" + '\n' +
        "varying vec3 fragNormal;" + '\n' +

        "uniform mat4 mWorld;" + '\n' +
        "uniform mat4 mView;" + '\n' +
        "uniform mat4 mProj;" + '\n' +


        "void main()" + '\n' +
        "{" + '\n' +
        "fragTexCoord = vertTexCoord;" + '\n' +
        "fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;" + '\n' +

        "gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);" + '\n' +
        "}"; //var shaderVertexShaderGLSLstring

    //////////////////////////
    // User Code
    // Fragment Shader String
    var shaderFragmetShaderGLSLstring = "precision mediump float;" + '\n' +

        "struct DirectionalLight" + '\n' +
        "{" + '\n' +
        "	vec3 direction;" + '\n' +
        "	vec3 color;" + '\n' +
        "};" + '\n' +

        "varying vec2 fragTexCoord;" + '\n' +
        "varying vec3 fragNormal;" + '\n' +

        "uniform vec3 ambientLightIntensity;" + '\n' +
        "uniform DirectionalLight sun;" + '\n' +
        "uniform sampler2D sampler;" + '\n' +

        "void main()" + '\n' +
        "{" + '\n' +
        "vec3 surfaceNormal = normalize(fragNormal);" + '\n' +
        "vec3 normSunDir = normalize(sun.direction);" + '\n' +
        "vec4 texel = texture2D(sampler, fragTexCoord);" + '\n' +

        "vec3 lightIntensity = ambientLightIntensity +" + '\n' +
        "sun.color * max(dot(fragNormal, normSunDir), 0.0);" + '\n' +

        "gl_FragColor = vec4(texel.rgb * lightIntensity, texel.a);" + '\n' +
        "}"; //   var shaderFragmetShaderGLSLstring

    // User only 
    // !!!!world3DSoureCode User!!!!!
    // Source Code
    var world3DSoureCode = "    var RunWebGLShaderJS2 = function(vertexShaderString, fragmentShaderString, textureImage, model3D, DrawMode) {" + "\n" +

        "console.log('WebGL Logo is working');" + "\n" +
        "model = model3D;" + "\n" +

        "var canvas = document.getElementById('shader-surface');" + "\n" +
        "var gl = canvas.getContext('webgl');" + "\n" +

        "if (!gl) {" + "\n" +
        "   console.log('WebGL not supported, falling back on experimental-webgl');" + "\n" +
        "gl = canvas.getContext('experimental-webgl');" + "\n" +
        "runFail();" + "\n" +
        "}" + "\n" +

        "if (!gl) {" + "\n" +
        "alert('Your browser does not support WebGL');" + "\n" +
        " runFail();" + "\n" +
        "}" + "\n" +

        "gl.enable(gl.DEPTH_TEST);" + "\n" +
        "gl.enable(gl.CULL_FACE);" + "\n" +
        "gl.frontFace(gl.CCW);" + "\n" +
        "gl.cullFace(gl.BACK);" + "\n" +

        "//" + "\n" +
        "// Create shaders" + "\n" +
        "// " + "\n" +
        "var vertexShader = gl.createShader(gl.VERTEX_SHADER);" + "\n" +
        " var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);" + "\n" +

        "gl.shaderSource(vertexShader, vertexShaderString);" + "\n" +
        "gl.shaderSource(fragmentShader, fragmentShaderString);" + "\n" +

        "gl.compileShader(vertexShader);" + "\n" +
        "if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {" + "\n" +
        "console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));" + "\n" +
        " return;" + "\n" +
        "}" + "\n" +

        "gl.compileShader(fragmentShader);" + "\n" +
        "if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {" + "\n" +
        "console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));" + "\n" +
        "return;" + "\n" +
        "}" + "\n" +

        "var program = gl.createProgram();" + "\n" +
        "gl.attachShader(program, vertexShader);" + "\n" +
        "gl.attachShader(program, fragmentShader);" + "\n" +
        "gl.linkProgram(program);" + "\n" +
        "   if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {" + "\n" +
        "console.error('ERROR linking program!', gl.getProgramInfoLog(program));" + "\n" +
        " return;" + "\n" +
        "}" + "\n" +
        "gl.validateProgram(program);" + "\n" +
        "if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {" + "\n" +
        "console.error('ERROR validating program!', gl.getProgramInfoLog(program));" + "\n" +
        " return;" + "\n" +
        "}" + "\n" +

        "//" + "\n" +
        "// Create buffer" + "\n" +
        "//" + "\n" +
        "var susanVertices = model3D.meshes[0].vertices;" + "\n" +
        "var susanIndices = [].concat.apply([], model3D.meshes[0].faces);" + "\n" +
        " var susanTexCoords = model3D.meshes[0].texturecoords[0];" + "\n" +
        "var susanNormals = model3D.meshes[0].normals;" + "\n" +

        "var susanPosVertexBufferObject = gl.createBuffer();" + "\n" +
        "gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);" + "\n" +
        " gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanVertices), gl.STATIC_DRAW);" + "\n" +

        "var susanTexCoordVertexBufferObject = gl.createBuffer();" + "\n" +
        "gl.bindBuffer(gl.ARRAY_BUFFER, susanTexCoordVertexBufferObject);" + "\n" +
        "gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanTexCoords), gl.STATIC_DRAW);" + "\n" +

        " var susanIndexBufferObject = gl.createBuffer();" + "\n" +
        "gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, susanIndexBufferObject);" + "\n" +
        "gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(susanIndices), gl.STATIC_DRAW);" + "\n" +

        "var susanNormalBufferObject = gl.createBuffer();" + "\n" +
        "gl.bindBuffer(gl.ARRAY_BUFFER, susanNormalBufferObject);" + "\n" +
        "gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanNormals), gl.STATIC_DRAW);" + "\n" +

        "gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);" + "\n" +
        " var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');" + "\n" +
        " gl.vertexAttribPointer(" + "\n" +
        " positionAttribLocation, // Attribute location" + "\n" +
        "  3, // Number of elements per attribute" + "\n" +
        "  gl.FLOAT, // Type of elements" + "\n" +
        " gl.FALSE," + "\n" +
        "  3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex" + "\n" +
        " 0 // Offset from the beginning of a single vertex to this attribute" + "\n" +
        ");" + "\n" +
        "  gl.enableVertexAttribArray(positionAttribLocation);" + "\n" +

        "gl.bindBuffer(gl.ARRAY_BUFFER, susanTexCoordVertexBufferObject);" + "\n" +
        " var texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');" + "\n" +
        "   gl.vertexAttribPointer(" + "\n" +
        "texCoordAttribLocation, // Attribute location" + "\n" +
        "   2, // Number of elements per attribute" + "\n" +
        " gl.FLOAT, // Type of elements" + "\n" +
        "gl.FALSE," + "\n" +
        "   2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex" + "\n" +
        "0" + "\n" +
        " );" + "\n" +
        " gl.enableVertexAttribArray(texCoordAttribLocation);" + "\n" +

        "gl.bindBuffer(gl.ARRAY_BUFFER, susanNormalBufferObject);" + "\n" +
        " var normalAttribLocation = gl.getAttribLocation(program, 'vertNormal');" + "\n" +
        "gl.vertexAttribPointer(" + "\n" +
        "normalAttribLocation," + "\n" +
        "3, gl.FLOAT," + "\n" +
        " gl.TRUE," + "\n" +
        "3 * Float32Array.BYTES_PER_ELEMENT," + "\n" +
        "0" + "\n" +
        ");" + "\n" +
        "  gl.enableVertexAttribArray(normalAttribLocation);" + "\n" +

        "//" + "\n" +
        "// Create texture" + "\n" +
        "//" + "\n" +
        "var susanTexture = gl.createTexture();" + "\n" +
        "gl.bindTexture(gl.TEXTURE_2D, susanTexture);" + "\n" +
        " gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);" + "\n" +
        "gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);" + "\n" +
        "gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);" + "\n" +
        "gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);" + "\n" +
        " gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);" + "\n" +
        "   gl.texImage2D(" + "\n" +
        " gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA," + "\n" +
        " gl.UNSIGNED_BYTE," + "\n" +
        " textureImage" + "\n" +
        ");" + "\n" +
        " gl.bindTexture(gl.TEXTURE_2D, null);" + "\n" +

        "  // Tell OpenGL state machine which program should be active." + "\n" +
        "gl.useProgram(program);" + "\n" +

        "var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');" + "\n" +
        " var matViewUniformLocation = gl.getUniformLocation(program, 'mView');" + "\n" +
        " var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');" + "\n" +

        "var worldMatrix = new Float32Array(16);" + "\n" +
        "var viewMatrix = new Float32Array(16);" + "\n" +
        "var projMatrix = new Float32Array(16);" + "\n" +
        "mat4.identity(worldMatrix);" + "\n" +
        "mat4.lookAt(viewMatrix, [0, 0, -20], [0, 0, 0], [0, 1, 0]);" + "\n" +
        "mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);" + "\n" +

        "gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);" + "\n" +
        "gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);" + "\n" +
        " gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);" + "\n" +

        "var xRotationMatrix = new Float32Array(16);" + "\n" +
        "var yRotationMatrix = new Float32Array(16);" + "\n" +

        "//" + "\n" +
        "// Lighting information" + "\n" +
        "//" + "\n" +
        "gl.useProgram(program);" + "\n" +

        "var ambientUniformLocation = gl.getUniformLocation(program, 'ambientLightIntensity');" + "\n" +
        "var sunlightDirUniformLocation = gl.getUniformLocation(program, 'sun.direction');" + "\n" +
        "var sunlightIntUniformLocation = gl.getUniformLocation(program, 'sun.color');" + "\n" +

        "gl.uniform3f(ambientUniformLocation, 0.2, 0.2, 0.2);" + "\n" +
        "gl.uniform3f(sunlightDirUniformLocation, 5.0, -5.0, -2.0);" + "\n" +
        "gl.uniform3f(sunlightIntUniformLocation, 0.9, 1.0, 1.0);" + "\n" +

        "//" + "\n" +
        "// Main render loop" + "\n" +
        " //" + "\n" +
        "var identityMatrix = new Float32Array(16);" + "\n" +
        "mat4.identity(identityMatrix);" + "\n" +
        "var angle = 0;" + "\n" +

        "var loop = function() {" + "\n" +
        "if (!this.m_runWorld3D) {" + "\n" +
        "console.log('m_runWorld3D: ' + this.m_runWorld3D);" + "\n" +
        "return;" + "\n" +
        " }" + "\n" +
        "canvas.onmousemove = function(e) {" + "\n" +

        "x = e.offsetX || e.clientX - canvas.offsetLeft;" + "\n" +
        "y = e.offsetY || e.clientY - canvas.offsetTop;" + "\n" +
        "// Focus / Mittel Punkt" + "\n" +
        "x = x - 300;" + "\n" +
        "y = y - 300;" + "\n" +


        " gl.uniform3f(sunlightDirUniformLocation, -x, -y, 1.0);" + "\n" +
        "}" + "\n" +
        "angle = performance.now() / 1000 / 6 * 2 * Math.PI;" + "\n" +
        "mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);" + "\n" +
        "mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);" + "\n" +
        "mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);" + "\n" +
        "gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);" + "\n" +
        "//!!!!!!!!!!" + "\n" +
        "gl.clearColor(0.9, 0.0, 0.1, 1.0); " + "\n" +
        "//!!!!!!!!!!" + "\n" +

        " gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);" + "\n" +

        "gl.bindTexture(gl.TEXTURE_2D, susanTexture);" + "\n" +
        "gl.activeTexture(gl.TEXTURE0);" + "\n" +

        "gl.drawElements(eval(DrawMode), susanIndices.length, gl.UNSIGNED_SHORT, 0);" + "\n" +

        "   requestAnimationFrame(loop);" + "\n" +
        "};" + "\n" +
        "if (!this.m_runWorld3D) {" + "\n" +

        "runLoopBool = true;" + "\n" +
        "return;" + "\n" +
        "} else {" + "\n" +

        "requestAnimationFrame(loop);" + "\n" +
        "}" + "\n" +
        "};";
    // End RunWebGLShaderJS()
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // Set all onclicks Button on Editor
    ///////////////////////////////////////
    // Button Vertex Shader
    vertexShaderOnclickButtonEditor.onclick = function() {
        editor.session.setMode(); // Set Editor Mode
        saveShaderUserInput(); // Save User text
        editor.setValue(shaderVertexShaderGLSLstring); // Set text in Editor
        indexSelecteEditor = 0; //Index Selecte Editor
        setAllEditorButtonsOffNotSelecte(this); //Set All Editor Buttons Off Not Selecte Color
    };
    /////////////////////
    // Button Fragment Shader
    fragmentShaderOnclickButtonEditor.onclick = function() {
        editor.session.setMode(); // Set Editor Mode
        saveShaderUserInput(); // Save User text
        editor.setValue(shaderFragmetShaderGLSLstring); // Set text in Editor
        indexSelecteEditor = 1; //Index Selecte Editor
        setAllEditorButtonsOffNotSelecte(this); //Set All Editor Buttons Off Not Selecte Color
    };
    ////////////////////////////////
    // Button Soure Code
    SoureCodeOnclickButtonEditor.onclick = function() {
        editor.session.setMode("ace/mode/javascript"); // Set Editor Mode

        saveShaderUserInput(); // Save User text
        editor.setValue(world3DSoureCode); // Set text in Editor
        indexSelecteEditor = 2; //Index Selecte Editor
        setAllEditorButtonsOffNotSelecte(this); //Set All Editor Buttons Off Not Selecte Color
    };
    /////////////////////////////////////////////////////////////////
    // Set Run Button Save and Start
    var buttonRunsArray = document.getElementsByClassName("editor-buttons-run");
    for (var i = 0; i < buttonRunsArray.length; i++) {
        buttonRunsArray[i].onclick = function() {
            saveShaderUserInput(); // Save user Inputs
            NewStart(); // 3d Model Restart
            document.getElementById("shader-surface").focus();
        };
    }

    // Rest    
    var buttonRestArray = document.getElementsByClassName("editor-buttons-rest");
    for (var i = 0; i < buttonRunsArray.length; i++) {
        buttonRestArray[i].onclick = function() {
            G_InitWebGLShaderJS(); // 3d Model Restart
            document.getElementById("shader-surface").focus();
        };
    }

    ////////////////////////////////////////////////////
    // Draw Mode
    drawModeSelection.onchange = function() {
            drawModeString = this.options[this.selectedIndex].value;
            for (var i = 0; i < accordeonElementArray.length; i++) {

                accordeonElementArray[i].classList.remove("accordeon-element-open");
            }
            accordeonElementArray[this.selectedIndex].classList.add("accordeon-element-open");
            NewStart();
            SetFoucs();
        }
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////

    accordeonElementArray[0].classList.add("accordeon-element-open");
    ////////////////////////////////////////////////////////////
    // Set select and notSelect by start
    vertexShaderOnclickButtonEditor.classList.add("Editor-button-Select-Color");

    //////////////////////////////////////////////////////////////////
    // Set Editor Configuration
    editor.setValue(shaderVertexShaderGLSLstring); // Set first test in Editor (Vertex Shader)
    editor.setTheme("ace/theme/twilight"); // Set Editor Theme
    /////////////////////////////////////////////
    // Set all button 
    onclickObject();
    NewStart(); // First Start

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    // Functions
    ///////////////////////////////////////////////////////////////////
    // Set All Editor Buttons Off Not Selecte Color  and add  Selecte Color
    function setAllEditorButtonsOffNotSelecte(setSelecteButton) {
        vertexShaderOnclickButtonEditor.classList.remove("Editor-button-Select-Color");
        fragmentShaderOnclickButtonEditor.classList.remove("Editor-button-Select-Color");
        SoureCodeOnclickButtonEditor.classList.remove("Editor-button-Select-Color");
        setSelecteButton.classList.add("Editor-button-Select-Color");
    };

    ////////////////////////////////////////////////////////////
    // Save User Input in Ace Editor
    function saveShaderUserInput() {
        switch (indexSelecteEditor) {
            case 0: // Save Vertex Shader (in Editor)
                shaderVertexShaderGLSLstring = editor.getValue();
                break;
            case 1: // Save Fragment Shader (in Editor)
                shaderFragmetShaderGLSLstring = editor.getValue();
                break;
            case 2: // Save Source Code (in Editor)
                world3DSoureCode = editor.getValue();
                break;
        }
    }

    /////////////////////////////////////////////////
    function onclickObject() {
        // Images (button) 3D Button
        var model3Dfilepick = [
            '../images/cube.png', // cube
            '../images/Sphere.png', // Sphere
            '../images/Logo.png', // Logo
            '../images/Icoshere.png', // Icoshere
            '../images/Torus.png', // Torus
            '../images/Cone.png' // Cone
        ];
        // Save All 3D Model Button in allTextureButtonsArray
        var allTextureButtonsArray = document.getElementsByClassName("New-Object");
        for (var i = 0; i < allTextureButtonsArray.length; i++) {

            allTextureButtonsArray[i].setAttribute("data-i", i); // Set index To button Attribute  (model3Dfile[model3DfileIndex];)
            allTextureButtonsArray[i].src = model3Dfilepick[i]; // Set Img rc

            // Set 3D Model Button On Click 
            allTextureButtonsArray[i].onclick = function() {
                runLoopBool = false; // stop 3D World 
                model3DfileIndex = this.getAttribute("data-i"); // Set index in  (model3Dfile[model3DfileIndex];)
                NewStart(); //Start 3D World
            }
        }
    }; // end onclickObject()

    function SetFoucs() {
        document.getElementById('shader-surface').scrollIntoView();

    }


    this.m_NewStart = function() {
        NewStart();
        SetFoucs();
    };

    // Strat 3D World And Load Resource
    // public
    function NewStart() {
        try {
            loadJSONResource(model3Dfile[model3DfileIndex], function(modelErr, modelObj) {
                if (modelErr) {
                    alert('Fatal error getting  model (see console)');
                    console.error(fsErr);
                    runFail();
                    return;
                } else {
                    // console.log(textureMangerClass.m_imageTextureLink);
                    loadImage(textureMangerClass.m_imageTextureLink(), function(imgErr, img) {

                        if (imgErr) {
                            alert('Fatal error getting Susan texture (see console)');
                            console.error(imgErr);
                            runFail();
                            return;
                        } else {
                            this.m_runWorld3D = true; //Set 3D World run
                            eval(world3DSoureCode);
                            RunWebGLShaderJS2(shaderVertexShaderGLSLstring, shaderFragmetShaderGLSLstring, img, modelObj, drawModeString);
                            //RunWebGLShaderJS(shaderVertexShaderGLSLstring, shaderFragmetShaderGLSLstring, img, modelObj, drawModeString);
                        }
                    });
                }

            });
        } catch (e) {
            runFail();
        }
    }
    /////////////////////////
    // Need:
    /////////////
    // id: logo-surface
    //////////////////////////////////////////////////////////////
    // run Fail
    function runFail() {
        var temp = document.getElementById('logo-surface');
        temp.style.height = 0;
        temp.style.width = 0;
        temp.style.border = "0px solid";
        var x = document.createElement("IMG");
        x.setAttribute("src", "../images/LogoHover_200x200v5 copy.svg");
        x.setAttribute("width", "200px");
        x.setAttribute("height", "200px");
        x.setAttribute("alt", "Logo");
        document.getElementById('logo-surface-fail').appendChild(x);
    }

    /////////////////////////////////////////////////////////////////////
    //Debug onlyDebug onlyDebug onlyDebug onlyDebug onlyDebug onlyDebug onlyDebug onlyDebug onlyDebug only
    // Debug only 
    // !!!!world3DSoureCode Debug!!!!!
    var RunWebGLShaderJS = function(vertexShaderString, fragmentShaderString, textureImage, model3D, DrawMode) {

        console.log('WebGL Logo is working');
        model = model3D;

        var canvas = document.getElementById('shader-surface');
        var gl = canvas.getContext('webgl');

        if (!gl) {
            console.log('WebGL not supported, falling back on experimental-webgl');
            gl = canvas.getContext('experimental-webgl');
            runFail();
        }

        if (!gl) {
            alert('Your browser does not support WebGL');
            runFail();
        }

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);

        //
        // Create shaders
        // 
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource(vertexShader, vertexShaderString);
        gl.shaderSource(fragmentShader, fragmentShaderString);

        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
            return;
        }

        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
            return;
        }

        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl.getProgramInfoLog(program));
            return;
        }
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(program));
            return;
        }

        //
        // Create buffer
        //
        var susanVertices = model3D.meshes[0].vertices;
        var susanIndices = [].concat.apply([], model3D.meshes[0].faces);
        var susanTexCoords = model3D.meshes[0].texturecoords[0];
        var susanNormals = model3D.meshes[0].normals;

        var susanPosVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanVertices), gl.STATIC_DRAW);

        var susanTexCoordVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, susanTexCoordVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanTexCoords), gl.STATIC_DRAW);

        var susanIndexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, susanIndexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(susanIndices), gl.STATIC_DRAW);

        var susanNormalBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, susanNormalBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanNormals), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);
        var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        gl.vertexAttribPointer(
            positionAttribLocation, // Attribute location
            3, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.enableVertexAttribArray(positionAttribLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, susanTexCoordVertexBufferObject);
        var texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');
        gl.vertexAttribPointer(
            texCoordAttribLocation, // Attribute location
            2, // Number of elements per attribute
            gl.FLOAT, // Type of elements
            gl.FALSE,
            2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
            0
        );
        gl.enableVertexAttribArray(texCoordAttribLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, susanNormalBufferObject);
        var normalAttribLocation = gl.getAttribLocation(program, 'vertNormal');
        gl.vertexAttribPointer(
            normalAttribLocation,
            3, gl.FLOAT,
            gl.TRUE,
            3 * Float32Array.BYTES_PER_ELEMENT,
            0
        );
        gl.enableVertexAttribArray(normalAttribLocation);

        //
        // Create texture
        //
        var susanTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, susanTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
            gl.UNSIGNED_BYTE,
            textureImage
        );
        gl.bindTexture(gl.TEXTURE_2D, null);

        // Tell OpenGL state machine which program should be active.
        gl.useProgram(program);

        var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
        var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
        var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

        var worldMatrix = new Float32Array(16);
        var viewMatrix = new Float32Array(16);
        var projMatrix = new Float32Array(16);
        mat4.identity(worldMatrix);
        mat4.lookAt(viewMatrix, [0, 0, -20], [0, 0, 0], [0, 1, 0]);
        mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.width / canvas.height, 0.1, 1000.0);

        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
        gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

        var xRotationMatrix = new Float32Array(16);
        var yRotationMatrix = new Float32Array(16);

        //
        // Lighting information
        //
        gl.useProgram(program);

        var ambientUniformLocation = gl.getUniformLocation(program, 'ambientLightIntensity');
        var sunlightDirUniformLocation = gl.getUniformLocation(program, 'sun.direction');
        var sunlightIntUniformLocation = gl.getUniformLocation(program, 'sun.color');

        gl.uniform3f(ambientUniformLocation, 0.2, 0.2, 0.2);
        gl.uniform3f(sunlightDirUniformLocation, 5.0, -5.0, -2.0);
        gl.uniform3f(sunlightIntUniformLocation, 0.9, 1.0, 1.0);

        //
        // Main render loop
        //
        var identityMatrix = new Float32Array(16);
        mat4.identity(identityMatrix);
        var angle = 0;

        var loop = function() {
            if (!this.m_runWorld3D) {
                console.log("m_runWorld3D: " + this.m_runWorld3D);
                return;
            }
            canvas.onmousemove = function(e) {
                // console.log(mouseStateBool);

                x = e.offsetX || e.clientX - canvas.offsetLeft;
                y = e.offsetY || e.clientY - canvas.offsetTop;
                // Focus / Mittel Punkt
                x = x - 300;
                y = y - 300;


                gl.uniform3f(sunlightDirUniformLocation, -x, -y, 1.0);
            }
            angle = performance.now() / 1000 / 6 * 2 * Math.PI;
            mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
            mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
            mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
            gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

            gl.clearColor(0.9, 0.0, 0.1, 1.0); //TOO DO
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

            gl.bindTexture(gl.TEXTURE_2D, susanTexture);
            gl.activeTexture(gl.TEXTURE0);

            gl.drawElements(eval(DrawMode), susanIndices.length, gl.UNSIGNED_SHORT, 0);

            requestAnimationFrame(loop);
        };
        if (!this.m_runWorld3D) {
            console.log("m_runWorld3D: " + this.m_runWorld3D);

            runLoopBool = true;
            return;
        } else {

            requestAnimationFrame(loop);
        }
    }; // End RunWebGLShaderJS()
}; // End G_InitWebGLShaderJS()