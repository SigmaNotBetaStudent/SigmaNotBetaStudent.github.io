// function drawSquares() {
//     for (let target of targetPositions) {
//         fill(255, 0, 0, 100); // Rosso trasparente
//         stroke(0); 
//         strokeWeight(2);
//         rect(target.leftX, target.topY, target.rightX - target.leftX, target.bottomY - target.topY);
//     }
// }

// function gotPoses(results) {
//     posesEs1 = results;
// }

// function checkFootPosition() {
//     let insideAnySquare = false;

//     for (let target of targetPositions) {
//         let feetInside = 0;

//         for (let i = 0; i < posesEs1.length; i++) {
//             let pose = posesEs1[i];
//             let leftAnkle = pose.keypoints[15];
//             let rightAnkle = pose.keypoints[16];

//             if (leftAnkle.confidence > 0.1 && rightAnkle.confidence > 0.1) {
//                 let leftInside =
//                     leftAnkle.x >= target.leftX &&
//                     leftAnkle.x <= target.rightX &&
//                     leftAnkle.y >= target.topY &&
//                     leftAnkle.y <= target.bottomY;

//                 let rightInside =
//                     rightAnkle.x >= target.leftX &&
//                     rightAnkle.x <= target.rightX &&
//                     rightAnkle.y >= target.topY &&
//                     rightAnkle.y <= target.bottomY;

//                 if (leftInside) feetInside++;
//                 if (rightInside) feetInside++;

//                 if (feetInside === 2) {
//                     insideAnySquare = true;
//                 }
//             }
//         }

//         if (feetInside === 2) {
//             fill(0, 255, 0, 100); // Verde trasparente se entrambi i piedi sono dentro
//         } else {
//             fill(255, 0, 0, 100);
//         }

//         stroke(0);
//         strokeWeight(0);
//         rect(target.leftX, target.topY, target.rightX - target.leftX, target.bottomY - target.topY);
//     }

//     if (insideAnySquare) {
//         console.log("✅ Entrambi i piedi sono nello stesso quadrato!");
//     } else {
//         console.log("❌ Piedi non allineati nel quadrato!");
//     }
// }