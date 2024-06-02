/*import {mongoclient} from  'mongodb';
      dotenv.config();
      
      const MONGO = process.env.MONGO_URL;
      
      async function createconnection(){
        const client = new mongoclient(MONGO);
        try{
        await client.connection
        console.log("Database connected")
        return client
        }catch(error){
          console.log(error);
        }
      }
      
       const client = await createconnection();
      
      
       async function register(name,email,password){
      return await client.db("hotelbooking").collection("register").inserOne({Name:name,Email:email,Password:password});
      }
      export default register;*/