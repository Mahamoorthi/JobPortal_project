"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from .views import hello_api, job_titles, jobs_by_company,register_user,basic_login,job_list,apply_job, user_applied_jobs


urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/',hello_api),
    path('register',register_user),
    path("login/",basic_login),
    path('jobs',job_list),
    path('apply',apply_job),
    path('job-titles/', job_titles),
    path('user-applied-jobs/<int:user_id>/', user_applied_jobs),
    path('jobs/company/<str:company_name>/', jobs_by_company),
]