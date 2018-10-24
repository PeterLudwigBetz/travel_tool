const date = new Date();
const departureDate = new Date(date.setDate(date.getDate() + 1))
  .toISOString().split('T')[0];
const returnDate = new Date(date.setDate(date.getDate() + 3))
  .toISOString().split('T')[0];

export const travelChecklists = [
  {
    'destination': 'Kampala, Uganda',
    'checklist':[
      {'id': 1,
        'name': 'Visa Application',
        'resources': [{
          'checklistItemId':1,
          'id':2,
          'label': 'Application guide',
          'link': 'https://google.com/application-guide'
        },
        ],
        'requiresFiles':true,
        'deleteReason':null,
      },{
        'id': 2,
        'name': 'Ticket Information',
        'resources': [{
          'checklistItemId':2,
          'id':1,
          'label': null,
          'link': 'https://google.com/application-guide'
        },
        ],
        'requiresFiles':false,
        'deleteReason':null,
      },
      {
        'id': 3,
        'name': 'Interpol Letter',
        'resources': [{
          'checklistItemId':3,
          'id':1,
          'label': null,
          'link': 'https://google.com/application-guide'
        },
        ],
        'requiresFiles':true,
        'deleteReason':null,
      }
    ]},
  {
    'destination': 'Lagos, Nigeria',
    checklist:[{'id': 8,
      'name': 'Visa Application',
      'resources': [{
        'checklistItemId':1,
        'id':2,
        'label': 'Application guide',
        'link': 'https://google.com/application-guide'
      },
      ],
      'requiresFiles':true,
      'deleteReason':null,
    },{
      'id': 9,
      'name': 'Yellow Fever',
      'resources': [{
        'checklistItemId':2,
        'id':1,
        'label': null,
        'link': 'https://google.com/application-guide'
      },
      ],
      'requiresFiles':true,
      'deleteReason':null,
    },
    {
      'id': 7,
      'name': 'Ticket Information',
      'resources': [{
        'checklistItemId':2,
        'id':1,
        'label': null,
        'link': 'https://google.com/application-guide'
      },
      ],
      'requiresFiles':false,
      'deleteReason':null,
    }
    ]}
];

export const mockRequest = {
  name: 'Tester Demola',
  origin: 'Kampala',
  destination: 'New york',
  gender: 'Male',
  manager: 'Some manager',
  department: 'TDD',
  role: 'Senior Consultant',
  tripType: 'multi',
  picture: 'https://sgeeegege',
  trips: [
    {
      origin: 'Nairobi',
      destination: 'New York',
      departureDate,
      returnDate,
    },
    {
      origin: 'New York',
      destination: 'Nairobi',
      departureDate,
      returnDate,
    }
  ],
};

export default travelChecklists;
