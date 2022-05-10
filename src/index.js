//Styles
import '@styles/vendors/normalize.css'
import '@/scss/main.scss'


//Import plugins
import { MetaProfit
} from '@components/metaprofit/MetaProfit';
import { MainPanel
} from '@components/mpanel/MainPanel';
import { Search
} from '@components/search/Search';
import { Favorites
} from '@components/favorites/Favorites';
import { Analitycs
} from '@components/analitycs/Analitycs';
import { AccountsManagment
} from '@components/accounts/AccountsManagment';
import { NotificationManagment
} from '@components/notification/NotificationManagment';
import { StickerGenerator
} from '@components/stickers/StickerGenerator';
import { Settings
} from '@components/settings/Settings';


//Create new MetaProfit app instanse with optional components
const metaProfit = new MetaProfit('#app', {
    components: [MainPanel, Search, Favorites, Analitycs, AccountsManagment, NotificationManagment, StickerGenerator, Settings]
})

metaProfit.render()