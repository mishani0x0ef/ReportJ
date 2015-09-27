var messageType = {
    get: 'GET',
    post: 'POST',
    success: 'CONFIRM_SUCCESS',
    error: 'CONFIRM_ERROR'
}

var Message = function(id, msgType, msgReceiver, msgData){
    
    var self = this;
    
    this.messageId = id;
    this.messageReceiver = msgReceiver;
    this.message = msgData;
    
    // GET - request for getting data.
    // POST - initial send operation such as save. In message - data for manipulation.
    // CONFIRM_SUCCESS - confirmation of success operation. No data in message.
    // CONFIRM_ERROR - notification about failed operation. In message - error text.
    this.type = msgType;
    
    this.send = function() {
        msgReceiver.postMessage(
            {
                messageId: self.messageId,
                type: self.type,
                message: self.message
            }, "*");
    }
}