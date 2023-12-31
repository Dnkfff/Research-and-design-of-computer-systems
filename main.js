'use strict';

window.onload = function (matrix) {

    const draw = (matrix) => {
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 800;
        ctx.font = '14px Helvetica';

        const couple = [];
        const points = [];

        // for (let i = 0; i < matrix.length; i++) {
        //     for (let j = 0; j < 11; j++) {
        //         if (matrix[i][j] === 1) {
        //             couple.push([i + 1, j + 1]);
        //         }
        //     }
        // }


        // Вхідні і вихідні точки стрілок
        let input = [];
        let output = [];

        const CIRCLE = (numsOfTops) => {
            const centX = 425;
            const centY = 425;
            const bigCircle = 275;


            const angle = 2 * Math.PI / (numsOfTops - 1);

            let startAngle = Math.PI;
            //ctx.beginPath()
            //ctx.arc(centX, centY, 20, 0, Math.PI * 2);
            //ctx.fillText(1, centX - 3, centY + 2);
            //ctx.stroke();


            //ctx.beginPath();
            ctx.lineWidth = 1;
            //ctx.moveTo(445, 425);


            //ctx.lineTo(519, 663);
            //ctx.moveTo(405, 425);
            //ctx.lineTo(154, 357);
            // ctx.stroke();
            // ctx.closePath();

            for (let i = 0; i < numsOfTops - 1; i++) {

                let centerXOfNewVertex = centX + (bigCircle * Math.sin(startAngle));
                let centerYOfNewVertex = centY + (bigCircle * Math.cos(startAngle));

                points.push([centerXOfNewVertex, centerYOfNewVertex]);

                output.push({
                    right: [centerXOfNewVertex + 20, centerYOfNewVertex],
                    left: [centerXOfNewVertex - 20, centerYOfNewVertex]
                });


                input.push({
                    top: [centerXOfNewVertex, centerYOfNewVertex - 20],
                    bottom: [centerXOfNewVertex, centerYOfNewVertex + 20]
                });


                ctx.beginPath();

                ctx.arc(centerXOfNewVertex, centerYOfNewVertex, 20, 0, Math.PI * 2);

                ctx.fillText(i, centerXOfNewVertex - 4, centerYOfNewVertex + 3);

                ctx.stroke();
                ctx.closePath();

                startAngle -= angle;
            }
        };


        console.log(matrix.length)
        CIRCLE(matrix.length);

        //Визначаємо пари вершин які мають зв'язоk
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < 8; j++) {
                if (matrix[i][j] === 1) {
                    couple.push([i + 1, j + 1]);
                }
            }
        };

        console.log(couple)

        const arrows = (fromX, fromY, toX, toY) => {
            const arrowSize = 1;
            let dx = toX - fromX;
            let dy = toY - fromY;
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(fromX, fromY);
            const angle = Math.atan2(dy, dx);

            ctx.lineTo(toX, toY);
            ctx.lineTo(
                toX - arrowSize * Math.cos(angle - Math.PI / 6),
                toY - arrowSize * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(toX, toY);
            ctx.lineTo(
                toX - arrowSize * Math.cos(angle + Math.PI / 6),
                toY - arrowSize * Math.sin(angle + Math.PI / 6));
            ctx.stroke();

        }

        // Циклом будуємо стрілки паралельно визначаючи, звідки вони будуть виходити
        console.log(output)
        for (let i = 0; i < couple.length; i++) {
            let fromX,
            fromY,
            toX,
            toY;

            if (couple[i][0] === couple[i][1]) {
                ctx.arc(points[couple[i][0] - 1][0], points[couple[i][0] - 1][1] - 27, 7, 0, 2 * Math.PI)
            } else if (points[couple[i][0] - 1][0] < points[couple[i][1] - 1][0]) {
                console.log(output)
                fromX = output[couple[i][0] - 1].right[0];
                fromY = output[couple[i][0] - 1].right[1];
                if (points[couple[i][0] - 1][1] < points[couple[i][1] - 1][1]) {
                    toX = input[couple[i][1] - 1].top[0];
                    toY = input[couple[i][1] - 1].top[1];
                } else {
                    toX = input[couple[i][1] - 1].bottom[0];
                    toY = input[couple[i][1] - 1].bottom[1];
                }
            } else {
                fromX = output[couple[i][0] - 1].left[0];
                fromY = output[couple[i][0] - 1].left[1];
                if (points[couple[i][0] - 1][1] < points[couple[i][1] - 1][1]) {
                    toX = input[couple[i][1] - 1].top[0];
                    toY = input[couple[i][1] - 1].top[1];
                } else {
                    toX = input[couple[i][1] - 1].bottom[0];
                    toY = input[couple[i][1] - 1].bottom[1];
                }
            }

            arrows(fromX, fromY, toX, toY)

        }

        console.log(matrix);

    }

    // const draw2 = (matrix) => {

    //     let canvas = document.getElementById('canv1');
    //     let ctx = canvas.getContext('2d');
    //     canvas.width = 800;
    //     canvas.height = 800;
    //     ctx.font = '14px Tahoma';

    //     const couple = [];
    //     const points = [];


    //     for (let i = 0; i < matrix.length; i++) {
    //         for (let j = 0; j < 11; j++) {
    //             if (matrix[i][j] === 1) {
    //                 couple.push([i + 1, j + 1]);
    //             }
    //         }
    //     }


    //     // малюємо вершини
    //     // Вхідні і вихідні точки напрямлених стрілок
    //     let input = [];
    //     let output = [];

    //     const CIRCLE = (numsOfTops) => {
    //         const centX = 425;
    //         const centY = 425;
    //         const bigCircle = 275;


    //         const angle = 2 * Math.PI / (numsOfTops - 1);

    //         let startAngle = Math.PI;
    //         ctx.beginPath()
    //         ctx.arc(centX, centY, 20, 0, Math.PI * 2);
    //         ctx.fillText(1, centX - 3, centY + 2);
    //         ctx.stroke();


    //         ctx.beginPath();
    //         ctx.lineWidth = 1;
    //         ctx.moveTo(445, 425);


    //         ctx.lineTo(519, 663);
    //         ctx.moveTo(405, 425);
    //         ctx.lineTo(154, 357);
    //         ctx.stroke();
    //         ctx.closePath();

    //         for (let i = 0; i < numsOfTops; i++) {



    //             let centerXOfNewVertex = centX + (bigCircle * Math.sin(startAngle));
    //             let centerYOfNewVertex = centY + (bigCircle * Math.cos(startAngle));

    //             points.push([centerXOfNewVertex, centerYOfNewVertex]);

    //             output.push({
    //                 right: [centerXOfNewVertex + 20, centerYOfNewVertex],
    //                 left: [centerXOfNewVertex - 20, centerYOfNewVertex]
    //             });


    //             input.push({
    //                 top: [centerXOfNewVertex, centerYOfNewVertex - 20],
    //                 bottom: [centerXOfNewVertex, centerYOfNewVertex + 20]
    //             });


    //             ctx.beginPath();

    //             ctx.arc(centerXOfNewVertex, centerYOfNewVertex, 20, 0, Math.PI * 2);

    //             ctx.fillText(i + 1, centerXOfNewVertex - 4, centerYOfNewVertex + 2);

    //             ctx.stroke();
    //             ctx.closePath();

    //             startAngle -= angle;
    //         }
    //     };

    //     CIRCLE(matrix.length);


    //     //Визначаємо пари вершин які мають зв'язоk
    //     for (let i = 0; i < matrix.length; i++) {
    //         for (let j = 0; j < 11; j++) {
    //             if (matrix[i][j] === 1) {
    //                 couple.push([i + 1, j + 1]);
    //             }
    //         }
    //     };


    //     const arrows = (fromX, fromY, toX, toY) => {
    //         const arrowSize = 8;
    //         let dx = toX - fromX;
    //         let dy = toY - fromY;
    //         ctx.beginPath();
    //         ctx.lineWidth = 1;
    //         ctx.moveTo(fromX, fromY);
    //         const angle = Math.atan2(dy, dx);

    //         ctx.lineTo(toX, toY);
    //         ctx.stroke();

    //     }


    //     // Будуэмо вершини другого графа
    //     for (let i = 0; i < couple.length; i++) {
    //         let fromX;
    //         let fromY;
    //         let toX;
    //         let toY;

    //         if (couple[i][0] === couple[i][1]) {
    //             ctx.beginPath();
    //             ctx.arc(points[couple[i][0] - 1][0], points[couple[i][0] - 1][1] - 26, 7, 0, 2 * Math.PI)
    //             ctx.stroke();
    //         } else if (points[couple[i][0] - 1][0] < points[couple[i][1] - 1][0]) {
    //             fromX = output[couple[i][0] - 1].right[0];
    //             fromY = output[couple[i][0] - 1].right[1];
    //             if (points[couple[i][0] - 1][1] < points[couple[i][1] - 1][1]) {
    //                 toX = input[couple[i][1] - 1].top[0];
    //                 toY = input[couple[i][1] - 1].top[1];
    //             } else {
    //                 toX = input[couple[i][1] - 1].bottom[0];
    //                 toY = input[couple[i][1] - 1].bottom[1];
    //             }
    //         } else {
    //             fromX = output[couple[i][0] - 1].left[0];
    //             fromY = output[couple[i][0] - 1].left[1];
    //             if (points[couple[i][0] - 1][1] < points[couple[i][1] - 1][1]) {
    //                 toX = input[couple[i][1] - 1].top[0];
    //                 toY = input[couple[i][1] - 1].top[1];
    //             } else {
    //                 toX = input[couple[i][1] - 1].bottom[0];
    //                 toY = input[couple[i][1] - 1].bottom[1];
    //             }
    //         }
    //         arrows(fromX, fromY, toX, toY)

    //     }


    // }

    // Викликаэмо функції
    draw([
        [0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]

    ]);

    // draw2([
    //     [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    //     [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    //     [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    //     [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    //     [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    //     [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    // ]);
}
