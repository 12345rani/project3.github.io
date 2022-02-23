
var db = require('./connection')

function adminmodel()
{
    this.fetchUser=(collection_name)=>{
        return new Promise((resolve, reject)=>{
           db.collection(collection_name).find().toArray((err,result)=>{
               err ? reject(err) : resolve(result);
           })
       })
    }
    this.manageUserStatus=(collection_name,urlObj)=>{
        return new Promise((resolve, reject)=>{
            if(urlObj.s=="block")
            {
                db.collection(collection_name).updateOne({'_id':parseInt(urlObj.regid)},{$set:{'status':0}},(err,result)=>{
                    err ? reject(err) : resolve(result);
                })
            }
            else if(urlObj.s=="verify")
            {
                db.collection(collection_name).updateOne({'_id':parseInt(urlObj.regid)},{$set:{'status':1}},(err,result)=>{
                    err ? reject(err) : resolve(result);
                })
            }
            else
            {
                db.collection(collection_name).deleteOne({'_id':parseInt(urlObj.regid)},(err,result)=>{
                    err ? reject(err) : resolve(result);
                })
            }
           })
    }
    this.cpadmin=(sunm,pDetails)=>{
        return new Promise((resolve, reject)=>{
           db.collection('register').find({'email':sunm,'password':pDetails.opass}).toArray((err,result)=>{
                if(err)
                    reject(err);
                else
                {
                    if(result.length==0)
                        resolve(0)
                    else
                    {
                        if(pDetails.npass!=pDetails.cnpass)
                            resolve(1)
                        else
                        {
                            db.collection('register').updateOne({'email':sunm},{$set:{'password':pDetails.cnpass}},(err,result)=>{
                                err ? reject(err) : resolve(2);
                            })
                        }
                    }
                }
           })
       })
    }
    
    this.epadmin=(sunm)=>{
        return new Promise((resolve, reject)=>{
            db.collection('register').find({'email':sunm}).toArray((err,result)=>{
                err ? reject(err) : resolve(result);
            })
        })
    }
    
    this.updateDetails=(userDetails)=>{
        return new Promise((resolve, reject)=>{
            db.collection('register').updateOne({'email':userDetails.email},{$set:{'name':userDetails.name,'mobile':userDetails.mobile,'address':userDetails.address,'gender':userDetails.gender}},
        (err,result)=>{
            err ? reject(err) : resolve(result);
            })
        })
      }
}
module.exports=new adminmodel()
