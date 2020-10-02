from django.urls import path
from pathAlgoWebApp import views

urlpatterns = [

path('',views.help,name='help'),

]
