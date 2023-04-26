const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Obtain the products from the catalogo collection based on the department
 * @param {string} department - The department to obtain the products from
 * @return {array} products - The array of products
 */
exports.getProductsByDepartment = functions.https.onCall(async (data, context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            "unauthenticated",
            "You must be logged in to use this feature"
        );
    }

    //Obtain the department from the data object
    const {department} = data;

    //Query catalogo collection with the specified department
    const catalogoRef = admin.firestore().collection("catalogo");
    const snapshot = await catalogoRef.where("departamento", "==", department).limit(50).get();

    //Obtain the products and save them in an array
    const products = [];
    snapshot.forEach((doc) => {
        products.push(doc.data());
    });

    //Return the array of products
    return { products };
});





