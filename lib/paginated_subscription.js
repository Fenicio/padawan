PaginatedSubscriptionHandle = function(perPage) {
  this.perPage = perPage;
  this._limit = perPage;
  this._limitListeners = new Deps.Dependency();
  this._loaded=0;
  this._loadedListeners = new Deps.Dependency();
}

PaginatedSubscriptionHandle.prototype.loaded = function() {
  this._loadedListeners.depend();
  return this._loaded;
}

PaginatedSubscriptionHandle.prototype.limit = function() {
  this._limitListeners.depend();
  return this._limit;
}

PaginatedSubscriptionHandle.prototype.ready =function() {
  return this.loaded() === this.limit();
}

PaginatedSubscriptionHandle.prototype.loading = function() {
  return ! this.ready();
}

PaginatedSubscriptionHandle.prototype.loadNextPage = function() {
  this._limit += this.perPage;
  this._limitListeners.changed();
}

PaginatedSubscriptionHandle.prototype.done = function() {
  this._loaded = this._limit;
  this._loadedListeners.changed();
}

PaginatedSubscriptionHandle.prototype.reset = function() {
  this._limit= this.perPage;
  this._limitListeners.changed();
}

Meteor.subscribeWithPagination = function() {
  var args = Array.prototype.slice.call(arguments, 0);
  var perPage = args.pop();
  
  var handle = new PaginatedSubscriptionHandle(perPage);
  
  Meteor.autorun(function () {
    var ourArgs = _.map(args, function(arg) {
      return _.isFunction(arg) ? arg() : arg;
    });
    
    var subHandle = Meteor.subscribe.apply(this, ourArgs.concat([
      handle.limit(), function() { handle.done(); }
    ]));
    handle.stop = subHandle.stop;
  });
  
  return handle;
}
