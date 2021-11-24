import {store} from 'store'

import AgentLayout from 'components/Agent/AgentPanelLayout.vue';

import Dashboard from 'components/Agent/Views/Dashboard/DashboardPage.vue';

import NotFound from 'components/Agent/Views/NotFound/NotFound.vue';

//PROFILE
import AgentProfile from 'components/Agent/Views/Profile/AgentProfile.vue';

//NEW TICKET
import FaveoForm from 'components/Common/Form/FaveoForm.vue';

//TICKETS INDEX
import TicketsIndex from 'components/Agent/Inbox/InboxLayout.vue';

//TICKETS TIMELINE
import TicketTimeline from 'components/Agent/Inbox/View/TicketTimeline';

//USER DIRECTORY
import UserDirectory from 'components/Agent/User/UserDirectory.vue';

//USER EXPORT
import UserExport from 'components/Agent/User/UserExport.vue';

//USER VIEW
import UserView from 'components/Agent/User/UserView.vue';

//AGENT EDIT
import AgentEdit from 'components/Admin/Staff/Agent/CreateUpdateAgent.vue';

//ORGANIZATION EXPORT
import OrganizationDirectory from 'components/Agent/Organization/OrganizationDirectory.vue';

//ORGANIZATION VIEW
import OrganizationView from 'components/Agent/Organization/OrganizationView.vue';

//CANNED RESPONSE INDEX
import CannedResponse from 'components/Agent/Tools/Canned/CannedResponse.vue';

//CANNED RESPONSE CREATE AND EDIT
import CannedCreateEdit from 'components/Agent//Tools/Canned/CannedCreateEdit.vue';

//KB ARTICLE INDEX
import KBArticleIndex from 'components/Agent/kb/article/index.vue';

//KB ARTICLE CREATE EDIT
import KBArticleCreateEdit from 'components/Agent/kb/article/Create/Article.vue';

//KB ARTICLE COMMENTS
import KBArticleComments from 'components/Agent/kb/comment/comments.vue';

//KB ARTICLE TEMPLATE CREATE EDIT
import KBArticleTemplate from 'components/Agent/kb/article/ArticleTemplate/ArticleTemplate.vue';

//KB ARTICLE TEMPLATE INDEX
import KBArticleTemplateIndex from 'components/Agent/kb/article/ArticleTemplate/ArticleTemplateIndex.vue';

//KB SETTINGS
import KBSettings from 'components/Agent/kb/settings/kbSettings';

//KB CATEGORY INDEX
import KBCategoryIndex from 'components/Agent/kb/Category/CategoryIndex.vue';

//KB CATEGORY CREATE EDIT
import KBCategoryCreateEdit from 'components/Agent/kb/Category/Category.vue';

//KB PAGE INDEX
import KBPageIndex from 'components/Agent/kb/Pages/PagesIndex.vue';

//KB PAGE CREATE EDIT
import KBPageCreateEdit from 'components/Agent/kb/Pages/Pages.vue';

//RECURRING TICKETS INDEX
import RecurringTickets from 'components/Agent/Tools/Recurring/RecurringTicketsIndex.vue';

let kbCannedMenu = {

	path: '/canned',
	
	component: AgentLayout,
	
	name: 'CannedResponse',
	
	redirect: '/canned/list',

	children : [
		
		{
			
			path: 'list',
			
			name: 'Canned Response Index',
			
			component: CannedResponse,

			meta: { title : 'canned_response', crumb : { link: { name : 'dashboard', to : '/' }, active : 'canned_response' } }
		},

		{

			path: 'create',
			
			name: 'Canned Response Create',
			
			component: CannedCreateEdit,
			
			meta: { title : 'canned_response', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'canned_response', to : '/canned' }, active : 'create' } }
		},

		{

			path: ':id/edit',
			
			name: 'Canned Response Edit',
			
			component: CannedCreateEdit,
			
			meta: { title : 'canned_response', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'canned_response', to : '/canned' }, active : 'edit' } }
		},
	]
}

let kbCategoryMenu = {

	path: '/category',
	
	component: AgentLayout,
	
	name: 'Category',
	
	redirect: '/category/list',

	children : [
		
		{

			path: 'list',
			
			name: 'KB Category Index',
			
			component: KBCategoryIndex,
			
			meta: { title : 'category', crumb : { link: { name : 'dashboard', to : '/' }, active : 'category' } }
		},

		{
			
			path: 'create',
			
			name: 'KB Category Create',
			
			component: KBCategoryCreateEdit,
			
			meta: { title : 'category', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'category', to : '/category' }, active : 'create' } }
		},

		{

			path: ':id/edit',
			
			name: 'KB Category Edit',
			
			component: KBCategoryCreateEdit,
			
			meta: { title : 'category', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'category', to : '/category' }, active : 'edit' } }
		},
	]
}

let kbArticlesMenu = {

	path: '/article',
	
	component: AgentLayout,
	
	name: 'Knowledgebase',
	
	redirect: '/article/list',
	
	children: [
		
		{
		
			path: 'list',
		
			name: 'KB Article',
		
			component: KBArticleIndex,

			meta: { title : 'article', crumb : { link: { name : 'dashboard', to : '/' }, active : 'article' } }
		},

		{
		
			path: 'create',
		
			name: 'KB Article Create',
		
			component: KBArticleCreateEdit,

			meta: { title : 'article', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'article', to : '/article' }, active : 'create' } }
		},

		{
		
			path: ':id/edit',
		
			name: 'KB Article Edit',
		
			component: KBArticleCreateEdit,

			meta: { title : 'article', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'article', to : '/article' }, active : 'edit' } }
		},

		{
		
			path: 'comment',
		
			name: 'KB Article Comments',
		
			component: KBArticleComments,

			props: true,

			meta: { title : 'comments', crumb : { link: { name : 'dashboard', to : '/' }, active : 'comments' } }
		},

		{
		
			path: 'create/template',
		
			name: 'KB Article Template Create',
		
			component: KBArticleTemplate,

			meta: { title : 'article_template', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'article_template', to : '/article/alltemplate/list' }, active : 'create' } }
		},

		{
		
			path: 'template/:id/edit',
		
			name: 'KB Article Template Edit',
		
			component: KBArticleTemplate,

			meta: { title : 'article_template', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'article_template', to : '/article/alltemplate/list' }, active : 'edit' } }
		},

		{
		
			path: 'alltemplate/list',
		
			name: 'KB Article Template List',
		
			component: KBArticleTemplateIndex,

			meta: { title : 'article_template', crumb : { link: { name : 'dashboard', to : '/' }, active : 'article_template' } }
		},
	]
}

let kbPagesMenu = {

	path: '/page',
	
	component: AgentLayout,
	
	name: 'KB Page',
	
	redirect: '/page/list',

	children : [
		
		{

			path: 'list',
			
			name: 'KB Pages Index',
			
			component: KBPageIndex,
			
			meta: { title : 'pages', crumb : { link: { name : 'dashboard', to : '/' }, active : 'pages' } }
		},

		{

			path: 'create',
			
			name: 'KB Page Create',
			
			component: KBPageCreateEdit,
			
			meta: { title : 'pages', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'pages', to : '/page' }, active : 'create' } }
		},

		{

			path: ':id/edit',
			
			name: 'KB Page Edit',
			
			component: KBPageCreateEdit,
			
			meta: { title : 'pages', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'pages', to : '/page' }, active : 'edit' } }
		},
	]
}

let kbSettingsMenu = {

	path: '/kb',
	
	component: AgentLayout,
	
	name: 'Knowledgebase Settings',
	
	redirect: '/kb/settings',
	
	children: [
		
		{
		
			path: 'settings',
		
			name: 'KB Settings',
		
			component: KBSettings,

			meta: { title : 'kb-settings', crumb : { link: { name : 'dashboard', to : '/' }, active : 'settings' } }
		}
	]
}

let usersMenu = {

	path: '/user',
	
	component: AgentLayout,
	
	name: 'Users',
	
	redirect: '/user/list',
	
	children: [
		
		{
			
			path: 'list',
			
			name: 'User Directory',
			
			component: UserDirectory,

			meta: { title : 'user_directory', crumb : { link: { name : 'dashboard', to : '/' }, active : 'user_directory' } }
		},

		{
			
			path: 'create',
			
			name: 'User Create',
			
			component: FaveoForm,
			
			props: { category : 'user', panel : 'agent' },
			
			meta: { title : 'user', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'user_directory', to : '/user' }, active : 'create' } }
		},

		{
			
			path: 'export',
			
			name: 'User Export',
			
			component: UserExport,

			meta: { title : 'export_user', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'user_directory', to : '/user' }, active : 'export_user' } }
		},

		{

			path: ':id',
			
			name: 'User View',
			
			component: UserView,
			
			meta: { title : 'profile', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'user_directory', to : '/user' }, active : 'viewing_as_user_profile' } }
		},

		{
			
			path: ':id/edit',
			
			name: 'User Edit',
			
			component: FaveoForm,
			
			props: { category : 'user', panel : 'agent', showViewButton : true },

			meta: { title : 'user', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'user_directory', to : '/user' }, active : 'edit' } }
		},
	]
}

let organizationMenu = {

	path: '/organizations',
	
	component: AgentLayout,
	
	name: 'Organizations',
	
	redirect: '/organizations/list',
	
	children: [
		
		{

			path: 'list',
			
			name: 'Organization Directory',
			
			component: OrganizationDirectory,
			
			meta: { title : 'organization_directory', crumb : { link: { name : 'dashboard', to : '/' }, active : 'organization_directory' } }
		},

		{

			path: 'create',
			
			name: 'Organization Create',
			
			component: FaveoForm,
			
			props: { category : 'organisation', panel : 'agent' },
			
			meta: { title : 'organizations', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'organization_directory', to : '/organizations' }, active : 'create' } }
		},

		{

			path: ':id',
			
			name: 'Organization View',
			
			component: OrganizationView,

			meta: { title : 'organization_profile', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'organization_directory', to : '/organizations' }, active : 'organization_profile' } }
		},

		{

			path: ':id/edit',
			
			name: 'Organizations Edit',
			
			component: FaveoForm,
			
			props: { category : 'organisation', panel : 'agent' },
			
			meta: { title : 'organizations', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'organization_directory', to : '/organizations' }, active : 'edit' } }
		},
	]
}

let routes = [
	
	{
		
		path: '/',
		
		component: AgentLayout,
		
		redirect: '/dashboard',
		
		name: 'Dashboard Layout',
		
		children: [
			
			{
				
				path: 'dashboard',
				
				name: 'Dashboard',
				
				component: Dashboard,

				meta: { title : 'dashboard', crumb : { active : 'dashboard' } }
			},

			{
				
				path: 'agent/recur/list',
				
				name: 'Recurring Tickets',
				
				component: RecurringTickets,

				meta: { title : 'recurring', crumb : { link: { name : 'dashboard', to : '/' }, active : 'ticket_recurring' } }
			},

			{
				
				path: 'agent/ticket/recur',
				
				name: 'Recurring Tickets Create',
				
				component: FaveoForm,

				props: { category : 'ticket', panel : 'agent', scenario : 'recur' },

				meta: { title : 'ticket_recurring', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'ticket_recurring', to : '/agent/recur/list' }, active : 'create' } }
			},

			{
				
				path: 'agent/recur/:id/edit',
				
				name: 'Recurring Tickets Edit',
				
				component: FaveoForm,

				props: { category : 'ticket', panel : 'agent', scenario : 'recur' },

				meta: { title : 'ticket_recurring', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'ticket_recurring', to : '/agent/recur/list' }, active : 'edit' } }
			},

			{

				path: 'profile',
				
				name: 'Profile',
				
				component: AgentProfile,
				
				meta: { title : 'view-profile', crumb : { link: { name : 'dashboard', to : '/' }, active : 'my_profile' } }
			},

			{
				path: 'newticket',

				name: 'NewTicket',
				
				component: FaveoForm,
				
				props: { category : 'ticket', panel : 'agent' },

				meta: { title : 'tickets', crumb : { link: { name : 'dashboard', to : '/' }, root : 'tickets', active : 'create_ticket' } }
			},

			{
				
				path: 'tickets',

				name: 'Tickets Index',
				
				component: TicketsIndex,

				meta: { title : '', crumb : { link: { name : 'dashboard', to : '/' }, root : 'tickets' } }
			},

			{

				path: 'thread/:id',
				
				name: 'Tickets Timeline',
				
				component: TicketTimeline,
				
				props : { from : 'timeline' },

				meta: { title : 'ticket-details', crumb : { link: { name : 'dashboard', to : '/' }, root : 'tickets' } }
			},

			{

				path: 'tickets/filter/:id',
				
				name: 'Filter Tickets Index',
				
				component: TicketsIndex,
				
				props : { from : 'filter' },

				meta: { title : 'filter', crumb : { link: { name : 'dashboard', to : '/' }, root : 'tickets' } }
			},

			{
				
				path: 'agent/:id',
				
				name: 'Agent View',
				
				component: UserView,

				meta: { title : 'profile', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'user_directory', to : '/user' }, active : 'viewing_as_agent_profile' } }
			},

			{
				
				path: 'agent/:id/edit',
				
				name: 'Agent Edit',
				
				component: AgentEdit,

				props: { isCalledFromUserDirectoryPage : true },

				meta: { title : 'user', crumb : { link: { name : 'dashboard', to : '/' }, root_link: { name : 'user_directory', to : '/user' }, active : 'edit' } }
			}
		]
	},

	usersMenu,

	organizationMenu,

	kbCannedMenu,

	kbArticlesMenu,

	kbSettingsMenu,

	kbCategoryMenu,

	kbPagesMenu,

	{
		path: '*',
		name:"404",
		component: NotFound
	}
];

export default routes;
