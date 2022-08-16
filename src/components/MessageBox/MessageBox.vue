<template>
    <div :class="['message-box',type]" @click.stop="modalClick">
        <div @click.stop="" class="inner">
            <header class="header">
                <h1 class="title">{{title}}</h1>
                <span class="close-btn" @click.stop="close">x</span>
            </header>

            <div class="content">{{content}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'messageBox',
        props: {
            title: {
                type: String,
                default: 'title'
            },
            content: {
                type: String,
                default: 'content'
            },
            type: {
                type: String,
                default: 'parmary',
                validator(value) {
                    return [
                        'parmary',
                        'success',
                        'warn',
                        'danger'
                    ].includes(value);
                }
            },
            closeOnClickModal: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {}
        },
        methods: {
            close() {
                this.$messageBox.hide(() => {
                    console.log('messageBox的 close callback');
                });
            },
            modalClick() {
                if(!this.closeOnClickModal) return
                this.$messageBox.hide();
            }
        }
    }
</script>

<style lang="scss" scoped>
body {
    margin: 0;
}

h1 {
    margin: 0;
    font-weight: normal;
}

.message-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);

    .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 500px;
        transform: translate(-50%,-50%);
        background: #fff;
        box-shadow: 1px 3px 5px #ededed;
        border-radius: 5px;
        overflow: hidden;

        .header {
            border-bottom: 1px solid #ccc;
            height: 44px;
            line-height: 44px;
            box-sizing: border-box;
            padding: 0px 10px;
           
            .title {
                float: left;
                font-size: 16px;
            }

            .close-btn {
                float: right;
                cursor: pointer;
            }
        }

        .content {
            padding: 20px;
            box-sizing: border-box;
        }
    }

    &.parmary {
        .header {
            background: blue;
            color: #fff;

        }
    }
    &.success {
        .header {
            background: green;
            color: #fff;

        }
    }
    &.warn {
        .header {
            background: orange;
            color: #333;

        }
    }
    &.danger {
        .header {
            background: red;
            color: #fff;

        }
    }
}
</style>