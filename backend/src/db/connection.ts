import { connect, disconnect } from "mongoose";


 async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
        
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connnect to MongoDb")
        
    }
}

//disconnecting data ase for error handleing
//dissconnect is proise if anything happens wrong within or inside of our application then will be disconnectiong of application from database
//becasue this is the secure approach

async function disconnectFromDatabase(){
    try {
        await disconnect();
        
    } catch (error) {
        console.log(error);
        throw new Error("Could not Disconnect From MongoDB");
        
    }

}

export { connectToDatabase, disconnectFromDatabase}