# AOT

## usage

### Wait
wait some condition before do something.

```ts
import { AOT_Placeholder, AOT } from 'aot';

class DB_Base {
    constructor(){
        this._db_init = this.initConnect()
    }
    protected _db_init:Promise<void>
    async initConnect(){
        // connect database in async
    }
}

class MyDB extends DB_Base {
    private _init_aot = new AOT("init my db");
    constructor(){
        super();
        // replace the placeholder, function now in JIT mode.
        this._init_aot.autoRegister(this);

        this._db_init.then(()=>{
            // complie the code Ahead-of-time
            this._init_aot.compile(true);
        });
    }

    @AOT_Placeholder.Wait("_db_init") // the insert code would run after this._db_init resolved.
    async insert(){
        // do something
    }
}
```

### Then
replace some function if condition is false.

```ts
class FileSystem_Shim {
    private async _writeFile_idb(){
        // write file from indexeddb 
    }
}

class FileSystem extends FileSystem_Shim{
    private _can_fs = new AOT('RequestFileSystem');
    constructor(){
        super();
        this._can_fs.autoRegister(this);

        this._can_fs.compile('webkitRequestFileSystem' in self||'requestFileSystem' in self);
    }
    @AOT_Placeholder.Then('_writeFile_idb')// if condition is false, use the 'Then' function
    async writeFile(){
        // write file by using fileSystem API
    }
}
```


> you can use `Wait` before `Then`. have fun.