function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.updater = updater;
    this.ref = {};
}

Component.prototype.isReactComponent = true;

Component.prototype.setState = function (preProps, callback) {
    this.updater.enqueueForceUpdate(this, preProps, callback, 'setState')
}

Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
}

function ComponentDumy() {
    ComponentDumy.prototype = Component.prototype;//寄生组合式继承
}

function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.ref = {};
    this.updater = updater;
}

const pureComponentPrototype = (PureComponent.prototype = new ComponentDumy());
pureComponentPrototype.constructor = PureComponent;

Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

export { Component, PureComponent }