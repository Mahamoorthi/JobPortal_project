# rest api function logic
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer,JobSerializer,ApplicationSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Application, Job


@api_view(['GET'])
def hello_api(Request):
    return Response({"message":"hello from django api"})


@api_view(['POST'])
def register_user(request):
    serializer =  RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()   #save user
        return Response({"message":"User Register Successfully!"},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def basic_login(request):
    username = request.data.get('username')
    password = request.data.get('password')


    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"user_id":user.id,"username":user.username ,"message": "login successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def job_list(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def apply_job(request):
    
    try:

        job_id = request.data.get("job")
        applicant_id = request.data.get("applicant")

        if Application.objects.filter(
            job_id=job_id,
            applicant_id=applicant_id
        ).exists():

            return Response(
                {"message": "You already applied!"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ApplicationSerializer(data={
            "job": job_id,
            "applicant": applicant_id
        })

        if serializer.is_valid():

            serializer.save()

            return Response(
                {"message": "Application Submitted"},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    except Exception as e:

        return Response(
            {"message": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
@api_view(['GET'])
def job_titles(request):
    jobs = Job.objects.values('id', 'title')
    return Response(jobs)

@api_view(['GET'])
def user_applied_jobs(request, user_id):

    applications = Application.objects.filter(
        applicant_id=user_id
    ).values(
        'id',
        'status',
        'applied_on',
        'job__title'
    )

    data = []

    for app in applications:
        data.append({
            "id": app['id'],
            "job_title": app['job__title'],
            "status": app['status'],
            "applied_on": app['applied_on']
        })

    return Response(data)
@api_view(['GET'])
def jobs_by_company(request, company_name):
    jobs = Job.objects.filter(company__iexact=company_name)
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)