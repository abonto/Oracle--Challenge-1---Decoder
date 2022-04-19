        const input = document.querySelector('#inputTexto');
        const output = document.querySelector('.lateral');

        input.oninput = verificarInput;

        var salida;

        function crearSalida() {
            const elem = document.querySelector('#outputTexto');
            const child = document.createTextNode('');

            elem.innerHTML = '';
            elem.appendChild(child);

            salida = child;
        }

        crearSalida();



        function codificarLetra(letra) {
            switch (letra) {
                case 'e':
                    return 'enter';
                case 'i':
                    return 'imes';
                case 'a':
                    return 'ai';
                case 'o':
                    return 'ober';
                case 'u':
                    return 'ufat';
                default:
                    return letra;
            }
        }

        function codificar(texto) {
            var salida = '';
            for (const c of texto) {
                salida += codificarLetra(c);
            }
            return salida;
        }

        function error() {
            throw new SyntaxError('codificación inválida');
        }

        function decodificar(texto) {
            var salida = ''
            for (var j = 0; j < texto.length;) {
                switch (texto[j]) {
                    case 'e':
                        if (texto[j + 4] === 'r') {
                            salida += texto[j];
                            j += 5;
                        } else {
                            error();
                        }
                        break
                    case 'i':
                        if (texto[j + 3] === 's') {
                            salida += texto[j];
                            j += 4;
                        } else {
                            error();
                        }
                        break
                    case 'a':
                        if (texto[j + 1] === 'i') {
                            salida += texto[j];
                            j += 2;
                        } else {
                            error();
                        }
                        break
                    case 'o':
                        if (texto[j + 3] === 'r') {
                            salida += texto[j];
                            j += 4;
                        } else {
                            error();
                        }
                        break
                    case 'u':
                        if (texto[j + 3] === 't') {
                            salida += texto[j];
                            j += 4;
                        } else {
                            error();
                        }
                        break;
                    default:
                        salida += texto[j++];
                }
            }
            return salida;
        }

        const noPerm = /[^a-z ]/g

        function verificarInput(ev) {
            const {
                inputType,
                target,
                data
            } = ev
            if (inputType === 'insertText') {
                noPerm.lastIndex = 0
                if (noPerm.test(data)) {
                    let value = target.value
                    target.value = value.substring(0, value.length - 1)
                    alert('solo letras minúsculas y sin acentos')
                }
            } else if (inputType === 'insertFromPaste') {
                let value = data || target.value || ''
                value = value.toLowerCase()
                target.value = value.replace(noPerm, '')
                if (target.value !== value) {
                    alert('texto modificado')
                }
            }
        }

        function inputDecodificar() {
            var txt = input.value;
            input.value = '';
            if (txt.length === 0) {
                salida.nodeValue = '';
                output.classList.remove('con-salida');
            } else {
                try {
                    salida.nodeValue = decodificar(txt);
                } catch (O_o) {
                    salida.nodeValue = 'Error en la decodificacion';
                }
                output.classList.add('con-salida');
            }

        }

        function inputCodificar() {
            var txt = input.value;
            input.value = '';
            if (txt.length === 0) {
                salida.nodeValue = '';
                output.classList.remove('con-salida');
            } else {
                salida.nodeValue = codificar(txt);
                output.classList.add('con-salida');
            }
        }

        const copiado = navigator.clipboard;

        function inputCopiar() {
            if (copiado) {
                copiado
                    .writeText(salida.nodeValue)
                    .then(() => alert('texto copiado'))
            }
        }